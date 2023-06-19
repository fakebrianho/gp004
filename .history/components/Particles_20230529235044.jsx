import { useMemo, useState, useEffect } from 'react'
import './RenderMaterial'
import './SimulationMaterial'
import getDataTexture from './getDataTexture'
// import { getDataTexture } from './getDataTexture'
import { createPortal, useFrame } from '@react-three/fiber'
import { LoadImage } from './LoadImage'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFBO } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer'
import textImage from '../public/tester.png'

const lerp = (a, b, t) => {
	return a * (1 - t) + b * t
}

async function getPixelDataFromImage(url, SIZE, NUMBER) {
	let img = await LoadImage(url)
	let width = 200
	let canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = width
	let ctx = canvas.getContext('2d')
	ctx.drawImage(img, 0, 0, width, width)
	let canvasData = ctx.getImageData(0, 0, width, width).data
	let pixels = []
	for (let i = 0; i < canvasData.length; i += 4) {
		let x = (1 / 4) % width
		let y = Math.floor(i / 4 / width)
		if (canvasData[i] < 5) {
			pixels.push({ x: x / width - 0.5, y: 0.5 - y / width })
		}
	}
	const data = new Float32Array(4 * NUMBER)
	for (let i = 0; i < SIZE; i++) {
		for (let j = 0; j < SIZE; j++) {
			const index = i * SIZE + j
			let randomPixel = pixels[Math.floor(Math.random() * pixels.length)]
			if (Math.random() > 0.9) {
				randomPixel = {
					x: 3 * (Math.random() - 0.5),
					y: 3 * (Math.random() - 0.5),
				}
			}
			data[4 * index] = randomPixel.x + (Math.random() - 0.5) * 0.01
			data[4 * index + 1] = randomPixel.y + (Math.random() - 0.5) * 0.01
			data[4 * index + 2] = 0
			data[4 * index + 3] = 1
		}
	}
	const dt = new THREE.DataTexture(
		data,
		SIZE,
		SIZE,
		THREE.RGBAFormat,
		THREE.FloatType
	)
	dt.needsUpdate = true
	return dt
}

export default function Particles() {
	const simMat = useRef()
	const renderMat = useRef()
	const mouseDebug = useRef()
	const { viewport } = useThree()
	const SIZE = 256
	const NUMBER = SIZE * SIZE
	const [switcher, setSwitcher] = useState(false)
	const [tempTexture, setTempTexture] = useState(null)
	const [tempTexture1, setTempTexture1] = useState(null)

	useEffect(() => {
		getPixelDataFromImage('/logo.png', SIZE, NUMBER).then((texture) => {
			setTempTexture(texture)
			// setSwitcher(true)
		})
		getPixelDataFromImage('/super.png', SIZE, NUMBER).then((texture) => {
			setTempTexture1(texture)
		})
		if (tempTexture && tempTexture1) {
			setSwitcher(true)
		}
	}, [])

	//GPGPU
	// getPixelDataFromImage('/tester.png', SIZE, NUMBER)
	const scene = new THREE.Scene()
	const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -2, 2)
	camera.position.z = 1
	let target0 = useFBO(SIZE, SIZE, {
		magFilter: THREE.NearestFilter,
		minFilter: THREE.NearestFilter,
		type: THREE.FloatType,
	})
	let target1 = useFBO(SIZE, SIZE, {
		magFilter: THREE.NearestFilter,
		minFilter: THREE.NearestFilter,
		type: THREE.FloatType,
	})

	const startingPosition = getDataTexture(SIZE)

	const particles = useMemo(() => {
		const p = new Float32Array(SIZE * SIZE * 3)
		for (let i = 0; i < SIZE; i++) {
			for (let j = 0; j < SIZE; j++) {
				const k = i * SIZE + j
				p[k * 3 + 0] = (i / SIZE) * 5
				p[k * 3 + 1] = (j / SIZE) * 5
				p[k * 3 + 2] = 0
			}
		}
		return p
	}, [])

	const uvRef = useMemo(() => {
		const p = new Float32Array(SIZE * SIZE * 2)
		for (let i = 0; i < SIZE; i++) {
			for (let j = 0; j < SIZE; j++) {
				const k = i * SIZE + j
				p[k * 2 + 0] = i / (SIZE - 1)
				p[k * 2 + 1] = j / (SIZE - 1)
			}
		}
		return p
	}, [])

	useFrame(({ gl, mouse }) => {
		console.log(switcher)
		if (simMat.current) {
			gl.setRenderTarget(target0)
			gl.render(scene, camera)
			gl.setRenderTarget(null)
			renderMat.current.uniforms.uPosition.value = target1.texture
			simMat.current.uniforms.uPosition.value = target0.texture
			let temp = target0
			target0 = target1
			target1 = temp
			mouseDebug.current.position.x = (mouse.x * viewport.width) / 2
			mouseDebug.current.position.y = (mouse.y * viewport.height) / 2
			simMat.current.uniforms.uMouse.value.x =
				(mouse.x * viewport.width) / 2
			simMat.current.uniforms.uMouse.value.y =
				(mouse.y * viewport.height) / 2
		}
	})
	return (
		<>
			{/* {switcher} */}
			{switcher ? (
				<>
					{createPortal(
						<mesh>
							<planeGeometry args={[2, 2]} />
							<simulationMaterial
								ref={simMat}
								uCurrentPosition={tempTexture}
								uOriginalPosition={tempTexture}
								uOriginalPosition1={tempTexture1}
							/>
						</mesh>,
						scene
					)}
				</>
			) : null}
			<mesh ref={mouseDebug}>
				<sphereBufferGeometry args={[0.1, 32, 32]} />
				<meshBasicMaterial color='red' />
			</mesh>
			<points>
				<bufferGeometry>
					<bufferAttribute
						attach='attributes-position'
						count={particles.length / 3}
						array={particles}
						itemSize={3}
					/>
					<bufferAttribute
						attach='attributes-ref'
						count={uvRef.length / 3}
						array={uvRef}
						itemSize={2}
					/>
				</bufferGeometry>
				<renderMaterial
					ref={renderMat}
					transparent={true}
					blending={THREE.AdditiveBlending}
				/>
			</points>
		</>
	)
}

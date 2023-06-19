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
		let x = (i / 4) % width
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
			if (Math.random() > 1.2) {
				randomPixel = {
					x: Math.random() - 0.1,
					y: Math.random() - 0.1,
				}
			}
			data[4 * index] = randomPixel.x + (Math.random() - 0.2) * 0.01
			data[4 * index + 1] = randomPixel.y + (Math.random() - 0.2) * 0.01
			// data[4 * index] = (Math.random() - 0.5) * 0.01
			// data[4 * index + 1] = (Math.random() - 0.5) * 0.01
			data[4 * index + 2] = (Math.random() - 0.5) * 0.01
			data[4 * index + 3] = (Math.random() - 0.5) * 0.01
			// data[4 * index + 2] = 0
			// data[4 * index + 3] = 0
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

export default function Particles(props) {
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
		Promise.all([
			getPixelDataFromImage('/circle3.png', SIZE, NUMBER),
			getPixelDataFromImage('/super.png', SIZE, NUMBER),
		]).then((textures) => {
			// getPixelDataFromImage('/logo.png', SIZE, NUMBER).then((texture) => {
			setTempTexture(textures[0])
			setTempTexture1(textures[1])
			setSwitcher(true)
		})
	}, [])

	//GPGPU
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

	/*------------------------------
	dt
	------------------------------*/
	const newData = new Float32Array(4 * NUMBER)
	for (let i = 0; i < SIZE; i++) {
		for (let j = 0; j < SIZE; j++) {
			const index = i * SIZE + j
			newData[4 * index] = lerp(-0.5, 0.5, j / (SIZE - 1))
			newData[4 * index + 1] = lerp(-0.5, 0.5, i / (SIZE - 1))
			newData[4 * index + 2] = 0
			newData[4 * index + 3] = 1
		}
	}

	const npositions = new THREE.DataTexture(
		newData,
		SIZE,
		SIZE,
		THREE.RGBAFormat,
		THREE.FloatType
	)
	npositions.needsUpdate = true

	useFrame(({ gl, mouse }, delta) => {
		// const delta = state.clock.getDelta()
		if (simMat.current) {
			console.log(delta)
			gl.setRenderTarget(target0)
			gl.render(scene, camera)
			gl.setRenderTarget(null)

			let temp = target0
			target0 = target1
			target1 = temp

			renderMat.current.uniforms.uTexture.value = target0.texture
			simMat.current.uniforms.uCurrentPosition.value = target1.texture

			mouseDebug.current.position.x = (mouse.x * viewport.width) / 2
			mouseDebug.current.position.y = (mouse.y * viewport.height) / 2
			simMat.current.uniforms.uMouse.value.x =
				(mouse.x * viewport.width) / 2
			simMat.current.uniforms.uMouse.value.y =
				(mouse.y * viewport.height) / 2
			simMat.current.uniforms.uTime.value += 0.1
			// console.log(simMat.current.uniforms.uTime)
		}
	})
	return (
		<>
			{switcher ? (
				<>
					{createPortal(
						<mesh>
							<planeGeometry args={[2, 2, 2, 2]} />
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
				<sphereBufferGeometry args={[0.01, 32, 32]} />
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
						attach='attributes-uv'
						count={uvRef.length / 2}
						array={uvRef}
						itemSize={2}
					/>
				</bufferGeometry>
				<renderMaterial
					ref={renderMat}
					uTexture={npositions}
					uColor={props.col}
					transparent={true}
					blending={THREE.AdditiveBlending}
				/>
			</points>
		</>
	)
}

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
	const particleRef = useRef()
	const renderMat = useRef()
	const mouseDebug = useRef()
	const { viewport, camera, size } = useThree()
	const mousePos = useRef(new THREE.Vector3())

	const SIZE = props.size
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
	const camera0 = new THREE.OrthographicCamera(-1, 1, 1, -1, -2, 2)
	camera0.position.z = 1
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

	useEffect(() => {
		const onMouseMove = (event) => {
			// Normalized device coordinates
			mousePos.current.set(
				(event.clientX / size.width) * 2 - 1,
				-(event.clientY / size.height) * 2 + 1,
				0
			)

			// console.log(mousePos)
			mousePos.current.unproject(camera)

			const dir = mousePos.current.sub(camera.position).normalize()
			const distance = -camera.position.z / dir.z
			mousePos.current = camera.position
				.clone()
				.add(dir.multiplyScalar(distance))
		}

		window.addEventListener('mousemove', onMouseMove)

		return () => {
			window.removeEventListener('mousemove', onMouseMove)
		}
	}, [camera, size])

	useFrame(({ gl, mouse }, delta) => {
		// const delta = state.clock.getDelta()
		if (simMat.current) {
			// console.log(delta)
			gl.setRenderTarget(target0)
			gl.render(scene, camera0)
			gl.setRenderTarget(null)

			let temp = target0
			target0 = target1
			target1 = temp

			renderMat.current.uniforms.uTexture.value = target0.texture
			simMat.current.uniforms.uCurrentPosition.value = target1.texture

			mouseDebug.current.position.x = mousePos.current.x
			mouseDebug.current.position.y = mousePos.current.y

			const mp = {
				x: (mouse.x * viewport.width) / 2,
				y: (mouse.y * viewport.height) / 2,
			}
			mouseDebug.current.rotation.z += 0.1
			const mp2 = {
				x: mouseDebug.current.position.x,
				y: mouseDebug.current.position.y,
			}
			simMat.current.uniforms.uMouse.value.x = mousePos.current.x
			simMat.current.uniforms.uMouse.value.y = mousePos.current.y
			simMat.current.uniforms.uTime.value += delta
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
								uSetting={props.setting}
								uRadius={1.5}
								uInnerRadius={0.5}
								uOuterRadius={1.0}
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
			<points userData={{ name: props.title }}>
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
					uSetting={props.setting}
					transparent={true}
					blending={THREE.AdditiveBlending}
				/>
			</points>
		</>
	)
}

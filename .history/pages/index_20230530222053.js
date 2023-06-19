import styles from '@/styles/Home.module.css'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useCanvasContext } from '@/components/ContextProvider'
import LightBulb from '@/components/Lightbulb'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Particles from '@/components/Particles'
import { Group } from 'three'
extend({ OrbitControls })

function Controls() {
	const { canvas } = useCanvasContext()
	const controls = useRef()
	const { camera, gl } = useThree()
	useFrame(() => controls.current.update())
	return (
		<orbitControls
			ref={controls}
			args={[camera, gl.domElement]}
			enableDamping
			dampingFactor={0.1}
			rotateSpeed={0.5}
		/>
	)
}

export default function Home() {
	return (
		<group>

		<Particles />
		<Controls />
		<ambientLight color={'white'} intensity={0.3} />
		</group>
	)
}

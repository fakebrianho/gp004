import styles from '@/styles/Home.module.css'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useCanvasContext } from '@/components/ContextProvider'
import LightBulb from '@/components/Lightbulb'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Particles from '@/components/Particles'
import Layout from '@/components/Layout'
import Page1 from '@/components/Page1'
import { Group } from 'three'
import { motion } from 'framer-motion'

const pageTransition = {
	out: {
		opacity: 0,
		y: 40,
		transition: {
			duration: 1.75,
		},
	},
	in: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.75,
			delay: 0.5,
		},
	},
}
extend({ OrbitControls })

function Controls() {
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
	const { canvas } = useCanvasContext()
	return (
		<motion.div
			variants={pageTransition}
			animate='in'
			initial='out'
			exit='out'
		>
			<Layout>
				{/* <Controls /> */}
				<Page1 />
			</Layout>
		</motion.div>
		// <group gl={canvas}>
		// 	<Particles />
		// 	<Controls />
		// 	<ambientLight color={'white'} intensity={0.3} />
		// </group>
		// // <div className={styles.scene}>
		// 	/* <Canvas
		// 		shadows
		// 		className={styles.canvas}
		// 		camera={{
		// 			position: [0, 0, 2],
		// 		}}
		// 	> */}
		// 		{/* <Floor position={[0, -1, 0]} /> */}
		// 		{/* <LightBulb position={[0, 3, 0]} /> */}
		// 		{/* <Box rotateX={3} rotateY={0.2} /> */}

		// 	{/* </Canvas> */}
		// {/* </div> */}
	)
}

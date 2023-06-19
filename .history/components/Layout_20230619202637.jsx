import { Canvas } from '@react-three/fiber'
import { useCanvasContext } from './ContextProvider'
// import { useCanvasContext } from './CanvasContext'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend } from '@react-three/fiber'
import { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import styles from '@/styles/Home.module.css'
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
export default function Layout({ children }) {
	const { setCanvas } = useCanvasContext()

	return (
		<div className={styles.scene}>
			<Canvas
				shadows
				className={styles.canvas}
				camera={{
					position: [0, 0, 1],
					fov: 70,
				}}
				onCreated={({ gl }) => setCanvas(gl)}
			>
				{/* <Controls /> */}
				{children}
			</Canvas>
		</div>
	)
}

// export default function Layout({ children }) {
//     const { setCanvas } = useCanvasContext();

//     return (
//       <Canvas onCreated={({ gl }) => setCanvas(gl)}>
//         {children}
//       </Canvas>
//     );
//   }

import { Canvas } from '@react-three/fiber'
import { useCanvasContext } from './ContextProvider'
// import { useCanvasContext } from './CanvasContext'
import styles from '@/styles/Home.module.css'

export default function Layout({ children }) {
	const { setCanvas } = useCanvasContext()

	return (
		<div className={styles.scene}>
			<Canvas
				shadows
				className={styles.canvas}
				camera={{
					position: [0, 0, 2],
				}}
				onCreated={({ gl }) => setCanvas(gl)}
			>
				{children}
			</Canvas>
		</div>
	)
}

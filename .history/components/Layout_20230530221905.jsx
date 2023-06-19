import { Canvas } from '@react-three/fiber'
import { useCanvasContext } from './CanvasContext'

export default function Layout({ children }) {
	const { setCanvas } = useCanvasContext()

	return (
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
	)
}

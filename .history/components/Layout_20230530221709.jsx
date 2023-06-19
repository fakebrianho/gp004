import { Canvas } from '@react-three/fiber'
import { useCanvasContext } from './CanvasContext'

export default function Layout({ children }) {
	const { setCanvas } = useCanvasContext()

	return <Canvas onCreated={({ gl }) => setCanvas(gl)}>{children}</Canvas>
}

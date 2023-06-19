import { Canvas } from '@react-three/fiber'
import { useContextEffect } from './CanvasContext'

export default function Layout({ children }) {
	const { setCanvas } = useContextEffect()

	return <Canvas onCreated={({ gl }) => setCanvas(gl)}>{children}</Canvas>
}

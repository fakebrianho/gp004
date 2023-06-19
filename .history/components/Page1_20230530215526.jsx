import { useContextEffect } from '../context/CanvasContext'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
export default function Page1() {
	const { canvas } = useContextEffect()
	const mesh = useRef()

	useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

	return (
		<mesh ref={mesh} gl={canvas}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={'orange'} />
		</mesh>
	)
}

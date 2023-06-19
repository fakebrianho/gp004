// import { useCanvasContext } from '../context/CanvasContext'
import { useCanvasContext } from '@/components/ContextProvider'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import Layout from '@/components/Layout'
export default function Page2() {
	const { canvas } = useCanvasContext()
	const mesh = useRef()

	useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

	return (
		<Layout>
			<mesh ref={mesh} gl={canvas}>
				<boxGeometry args={[1, 1, 1]} />
				<meshBasicMaterial color={'red'} />
			</mesh>
		</Layout>
	)
}

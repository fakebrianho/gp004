// import { useCanvasContext } from '../context/CanvasContext'
import { useCanvasContext } from '@/components/ContextProvider'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useRouter } from 'next/router'

function nextPage() {}

export default function Page1() {
	const { canvas } = useCanvasContext()
	const mesh = useRef()
	const router = useRouter()

	useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

	return (
		<mesh ref={mesh} gl={canvas} onClick={() => router.push('/about')}>
			<boxGeometry args={[1, 1, 1]} />
			<meshBasicMaterial color={'orange'} />
		</mesh>
	)
}

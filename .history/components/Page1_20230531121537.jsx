// import { useCanvasContext } from '../context/CanvasContext'
import { useCanvasContext } from '@/components/ContextProvider'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const pageTransition = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { duration: 0.5 } },
	exit: { opacity: 0, transition: { duration: 0.5 } },
}
function nextPage() {}

export default function Page1() {
	// const { canvas } = useCanvasContext()
	const mesh = useRef()
	const router = useRouter()

	useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

	return (
		<motion.div
		initial="hidden"
		animate="show"
		exit="exit"
		variants={pageTransition}
	  >
		<mesh ref={mesh} onClick={() => router.push('/about')}>
			<boxGeometry args={[1, 1, 1]} />
			<meshBasicMaterial color={'orange'} />
		</mesh>
	)
}

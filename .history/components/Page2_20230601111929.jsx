// import { useCanvasContext } from '../context/CanvasContext'
import { useCanvasContext } from '@/components/ContextProvider'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import Particles from './Particles'
import Layout from '@/components/Layout'
import { Color } from 'three'
export default function Page2() {
	const mesh = useRef()

	// useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

	return (
		// <Layout>
		// <mesh ref={mesh}>
		// 	<boxGeometry args={[1, 1, 1]} />
		// 	<meshBasicMaterial color={'red'} />
		// </mesh>
		<>
			<Particles col={new Color('#f7b373')} size={256} setting={1} />
			<Particles col={new Color('#f7b373')} size={144} setting={2} />
		</>
		// </Layout>
	)
}

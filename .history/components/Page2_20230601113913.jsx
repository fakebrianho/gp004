// import { useCanvasContext } from '../context/CanvasContext'
import { useCanvasContext } from '@/components/ContextProvider'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import Particles from './Particles'
import Layout from '@/components/Layout'
import { Color } from 'three'
import Title from './Title'
export default function Page2() {
	const mesh = useRef()

	useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

	return (
		// <Layout>
		// <mesh ref={mesh}>
		// 	<boxGeometry args={[1, 1, 1]} />
		// 	<meshBasicMaterial color={'red'} />
		// </mesh>
		<>
			<Title
				ref={mesh}
				position={[0, 0, 0]}
				scale={[0.35, 0.35, 0.35]}
				rotation={[-Math.PI / 2, 0, 0]}
				text={'Uncertain'}
			/>
			<Particles col={new Color('#f7b373')} size={112} setting={2} />
			<Particles col={new Color('#f7b373')} size={256} setting={1} />
		</>
		// </Layout>
	)
}

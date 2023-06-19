// import { useCanvasContext } from '../context/CanvasContext'
import { useCanvasContext } from '@/components/ContextProvider'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import Particles from './Particles'
import Layout from '@/components/Layout'
import { Color } from 'three'
import styles from '@/styles/Overlay.module.css'
import Title from './Title'
import { gsap } from 'gsap'
export default function Page2() {
	const mesh = useRef()
	return (
		<>
			<Title
				ref={mesh}
				position={[0, 0.125, 0]}
				scale={[0.25, 0.25, 0.25]}
				rotation={[-Math.PI / 2, 0, 0]}
				text={'Uncertain'}
			/>
			<Title
				ref={mesh}
				position={[0, -0.125, 0]}
				scale={[0.25, 0.25, 0.25]}
				rotation={[-Math.PI / 2, 0, 0]}
				text={'Universe'}
			/>

			<Particles col={new Color('#f7b373')} size={112} setting={2} />
			<Particles col={new Color('#f7b373')} size={256} setting={1} />
		</>
	)
}
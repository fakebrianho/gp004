// // import { useCanvasContext } from '../context/CanvasContext'
// import { useCanvasContext } from '@/components/ContextProvider'
// import { useFrame } from '@react-three/fiber'
// import { useRef, useState, useEffect } from 'react'
// import Particles from './Particles'
// import Layout from '@/components/Layout'
// import { Color } from 'three'
// import styles from '@/styles/Overlay.module.css'
// import Title from './Title'
// import { gsap } from 'gsap'
// export default function Page2() {
// 	return (
// 		<>
// 			<Title
// 				position={[0, 0.125, 0]}
// 				scale={[0.25, 0.25, 0.25]}
// 				rotation={[-Math.PI / 2, 0, 0]}
// 				text={'Uncertain'}
// 			/>
// 			<Title
// 				position={[0, -0.125, 0]}
// 				scale={[0.25, 0.25, 0.25]}
// 				rotation={[-Math.PI / 2, 0, 0]}
// 				text={'Universe'}
// 			/>

// 			<Particles col={new Color('#f7b373')} size={112} setting={2} />
// 			<Particles col={new Color('#f7b373')} size={256} setting={1} />
// 		</>
// 	)
// }

// import { useCanvasContext } from '../context/CanvasContext'
import { useCanvasContext } from '@/components/ContextProvider'
import { useFrame } from '@react-three/fiber'
import {
	useRef,
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react'
import Particles from './Particles'
import Layout from '@/components/Layout'
import { Color } from 'three'
import styles from '@/styles/Overlay.module.css'
import Title from './Title'
import { gsap } from 'gsap'

const Page2 = forwardRef((props, ref) => {
	const mesh1 = useRef()
	const mesh2 = useRef()

	// Expose the refs to the parent component
	useImperativeHandle(ref, () => ({
		mesh1: mesh1.current,
		mesh2: mesh2.current,
	}))
	useEffect(() => {
		console.log(ref)
	}, [])
	return (
		<>
			<Title
				ref={mesh1}
				position={[0, 0.125, 0]}
				scale={[0.25, 0.25, 0.25]}
				rotation={[-Math.PI / 2, 0, 0]}
				text={'Uncertain'}
			/>
			<Title
				ref={mesh2}
				position={[0, -0.125, 0]}
				scale={[0.25, 0.25, 0.25]}
				rotation={[-Math.PI / 2, 0, 0]}
				text={'Universe'}
			/>

			<Particles col={new Color('#f7b373')} size={112} setting={2} />
			<Particles col={new Color('#f7b373')} size={256} setting={1} />
		</>
	)
})
Page2.displayName = 'Page2'
export default Page2

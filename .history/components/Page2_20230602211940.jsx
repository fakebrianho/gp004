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
import IntroMiddleEarth from './IntroMiddleEarth'

const Page2 = forwardRef((props, ref) => {
	const particles1 = useRef()
	const particles2 = useRef()
	useFrame(() => {
		console.log(particles1)
		console.log(particles2)
	})
	return (
		<>
			<Title
				ref={ref}
				position={props.title1.position}
				scale={props.title1.scale}
				rotation={props.title1.rotation}
				text={props.title1.text}
				trigger={props.title2.startAnimation}
			/>
			<Title
				position={props.title2.position}
				scale={props.title2.scale}
				rotation={props.title2.rotation}
				text={props.title2.text}
				trigger={props.title2.startAnimation}
			/>
			<IntroMiddleEarth />
			<Particles
				ref={particles1}
				col={new Color('#f7b373')}
				size={112}
				setting={2}
			/>
			<Particles
				ref={particles2}
				col={new Color('#f7b373')}
				size={256}
				setting={1}
			/>
		</>
	)
})
Page2.displayName = 'Page2'
export default Page2

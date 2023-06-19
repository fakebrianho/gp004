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
import { AnimationControlContext } from './AnimationControlContext'
// import { a } from 'react-spring/three'

const Page2 = forwardRef((props, ref) => {
	// console.log(props.title2)
	return (
		<>
			<Title
				// position={[0, 0.125, 0]}
				// scale={[0.25, 0.25, 0.25]}
				// rotation={[-Math.PI / 2, 0, 0]}
				// text={'Uncertain'}
				position={props.title1.position}
				scale={props.title1.scale}
				rotation={props.title1.rotation}
				text={props.title1.text}
				trigger={props.title2.startAnimation}
			/>
			<Title
				position={props.title2.position}
				scale={props.title2.scale}
				// scale={[0.5, 0.5, 0.5]}
				rotation={props.title2.rotation}
				text={props.title2.text}
				trigger={props.title2.startAnimation}
			/>

			<Particles col={new Color('#f7b373')} size={112} setting={2} />
			<Particles col={new Color('#f7b373')} size={256} setting={1} />
		</>
	)
})
Page2.displayName = 'Page2'
export default Page2

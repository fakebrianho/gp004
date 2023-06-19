import { useCanvasContext } from '@/components/ContextProvider'
import { useFrame, useThree } from '@react-three/fiber'
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
	const animRef = useRef()
	animRef.current = false
	const [active, setActive] = useState(false)

	const particles1 = useRef()
	const particles2 = useRef()
	const { scene } = useThree()

	const particles = []

	useEffect(() => {
		scene.children.forEach((child) => {
			if (child.type == 'Points') {
				particles.push(child)
			}
		})

		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					animRef.current = true
					particles.forEach((particle) => {
						console.log(particle.material.uniforms)
						gsap.to(particle.scale, { x: 0.25, duration: 2 })
						gsap.to(particle.scale, { y: 0.25, duration: 2 })
						gsap.to(particle.scale, { z: 0.25, duration: 2 })
						gsap.to(particle.material.uniforms, {
							uAlpha: 0,
							duration: 1.5,
						})
					})
					// console.log(particles)
				}
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false })
		return () => {
			window.removeEventListener('wheel', handleWheel)
		}
	}, [])

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
				title={'bye'}
				col={new Color('#f7b373')}
				size={112}
				setting={2}
			/>
			<Particles
				title={'hi'}
				col={new Color('#f7b373')}
				size={256}
				setting={1}
			/>
		</>
	)
})
Page2.displayName = 'Page2'
export default Page2

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
			console.log(typeof child.type)
			if (child.type == 'Points') {
				console.log(child)
			}
		})

		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					animRef.current = true
					// gsap.to('')
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

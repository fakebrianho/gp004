import Layout from '@/components/Layout'
import Page2 from '@/components/Page2'
import { motion } from 'framer-motion'
import Overlay from '@/components/Overlay'
import { useSpring, animated, config } from '@react-spring/three'
import { useRef } from 'react'
import React, { useState, useEffect, createContext } from 'react'
import { gsap } from 'gsap'
import styles from '@/styles/Overlay.module.css'
import { AnimationControlContext } from '@/components/AnimationControlContext'
import { useFrame } from '@react-three/fiber'
// const AnimationControlContext = React.createContext()
// export const AnimationControlContext = createContext()

const pageTransition = {
	out: {
		opacity: 0,
		y: 40,
		transition: {
			duration: 1.75,
		},
	},
	in: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.75,
			delay: 0.5,
		},
	},
}

export default function About() {
	// const [startAnimation, setStartAnimation] = useState(false);
	// let startAnimation = false
	const [startAnimation, setStartAnimation] = useState(false)
	const handleClick = () => {
		// setStartAnimation(true)
		console.log(page2Ref)
	}

	const overlayRef = useRef()
	const [scrollStart, setScrollStart] = useState(null)
	let triggerRef = useRef()
	triggerRef.current = false

	const animRef = useRef()
	const page2Ref = useRef()
	const [scale, setScale] = useState([0.25, 0.25, 0.25])

	const [title1, setTitle1] = useState({
		position: [0, 0.125, 0],
		scale: [0.25, 0.25, 0.25],
		rotation: [-Math.PI / 2, 0, 0],
		text: 'Uncertain',
		trigger: triggerRef.current,
	})
	const [title2, setTitle2] = useState({
		position: [0, -0.125, 0],
		// scale: [0.25, 0.25, 0.25],
		rotation: [-Math.PI / 2, 0, 0],
		text: 'Universe',
		trigger: triggerRef.current,
	})
	// const [scale, setScale] = useState([0.25, 0.25, 0.25])
	const props = useSpring({
		scale: [0.5, 0.5, 0.5],
		config: config.molasses, // Adjust the config values for desired animation speed
		immediate: false,
	})
	animRef.current = false

	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					gsap.to(`.${styles.Container}`, {
						opacity: 0,
						duration: 1,
					})
					// setScale([0.5, 0.5, 0.5])
					handleClick()
					// scale[0] = 0.5
					animRef.current = true
				}
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false })
		// console.log(page2Ref)
		return () => {
			window.removeEventListener('wheel', handleWheel)
		}
	}, [])
	const ref = useRef(null)
	const isReadyRef = useRef(false)

	useEffect(() => {
		if (ref.current && !isReadyRef.current) {
			isReadyRef.current = true
			console.log(ref)
		}
	}, [ref])
	// useFrame(() => {
	// 	console.log(page2Ref)
	// })
	return (
		<AnimationControlContext.Provider value={startAnimation}>
			<motion.div
				variants={pageTransition}
				animate='in'
				initial='out'
				exit='out'
			>
				<Overlay
					ref={overlayRef}
					content={'About'}
					scroll={true}
					read={false}
				/>
				<Layout>
					<Page2
						title1={{ ...title1, scale, startAnimation }}
						title2={{ ...title2, scale, startAnimation }}
						ref={page2Ref}
					/>
				</Layout>
			</motion.div>
		</AnimationControlContext.Provider>
	)
}

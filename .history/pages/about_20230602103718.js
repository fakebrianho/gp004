import Layout from '@/components/Layout'
import Page2 from '@/components/Page2'
import { motion } from 'framer-motion'
import Overlay from '@/components/Overlay'
import { useSpring, animated, config } from '@react-spring/three'
import { useRef } from 'react'
import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import styles from '@/styles/Overlay.module.css'
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
	const overlayRef = useRef()
	const [scrollStart, setScrollStart] = useState(null)
	const [trigger, setTrigger] = useState({ trigger: false })
	// const

	const animRef = useRef()
	const page2Ref = useRef()
	const scale = [0.25, 0.25, 0.25]

	const [title1, setTitle1] = useState({
		position: [0, 0.125, 0],
		scale: [0.25, 0.25, 0.25],
		rotation: [-Math.PI / 2, 0, 0],
		text: 'Uncertain',
	})
	const [title2, setTitle2] = useState({
		position: [0, -0.125, 0],
		// scale: [0.25, 0.25, 0.25],
		rotation: [-Math.PI / 2, 0, 0],
		text: 'Universe',
	})
	// const [scale, setScale] = useState([0.25, 0.25, 0.25])
	const props = useSpring({
		scale: [0.5, 0.5, 0.5],
		config: config.molasses, // Adjust the config values for desired animation speed
		immediate: false,
	})
	console.log(scale)
	animRef.current = false
	// useEffect(() => {
	// 	setScale(props.scale)
	// }, [props.scale])
	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					gsap.to(`.${styles.Container}`, {
						opacity: 0,
						duration: 1,
					})
					setScrollStart()
					// setTrigger(!trigger)

					// setScale(props.scale)
					animRef.current = true
				}
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false })

		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('wheel', handleWheel)
		}
	}, [])
	return (
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
					title1={title1}
					title2={{ ...title2, scale }}
					ref={page2Ref}
				/>
			</Layout>
		</motion.div>
	)
}

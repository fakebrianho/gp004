import Layout from '@/components/Layout'
import Page2 from '@/components/Page2'
import { motion } from 'framer-motion'
import Overlay from '@/components/Overlay'
import EnterAnimation from '@/components/EnterAnimation'
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
	const page2ref = useRef()
	const [scrollStart, setScrollStart] = useState(null)
	const [animStart, setAnimStart] = useState(false)

	useEffect(() => {
		const handleScroll = (event) => {
			// Check if the user has not scrolled before
			if (!scrollStart) {
				setScrollStart(event.pageY)
				return
			}
			// Check if the user has scrolled more than a certain amount
			const scrollDelta = event.pageY - scrollStart
			if (scrollDelta < 50) {
				return
			}

			setScrollStart(null)
		}
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animStart) {
				if (event.deltaY >= 25) {
					gsap.to(`.${styles.Container}`, {
						opacity: 0,
						duration: 1,
					})
					setAnimStart(true)
				}
			}
		}
		window.addEventListener('wheel', handleWheel, { passive: false })

		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('wheel', handleWheel)
		}
	}, [animStart])
	return (
		<motion.div
			variants={pageTransition}
			animate='in'
			initial='out'
			exit='out'
		>
			<EnterAnimation>
				<Overlay
					ref={overlayRef}
					content={'About'}
					scroll={true}
					read={false}
				/>
				<Layout>
					<Page2 ref={page2ref} />
				</Layout>
			</EnterAnimation>
		</motion.div>
	)
}

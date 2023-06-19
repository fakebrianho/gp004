import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import styles from '@/styles/Overlay.module.css'
const EnterAnimation = ({ animations, children, references }) => {
	const [scrollStart, setScrollStart] = useState(null)
	const [animStart, setAnimStart] = useState(false)
	let isScroll = false

	getChildrenClassNames(children)
	// tl.to('')

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

	return <div className='test'>{children}</div>
}

export default EnterAnimation

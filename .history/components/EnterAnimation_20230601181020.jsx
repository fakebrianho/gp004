import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import styles from '@/styles/Overlay.module.css'
const EnterAnimation = ({ animations, children }) => {
	const [scrollStart, setScrollStart] = useState(null)
	const [animStart, setAnimStart] = useState(false)
	// const [isScroll, setIsScroll] = useState(false)
	let isScroll = false
	var tl = gsap.timeline()
	const getChildrenClassNames = (children) => {
		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child)) {
				return
			}
			// if (child.props.scroll) {
			isScroll = true
			// 	setIsScroll(true)
			// }
		})
	}

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

			// Trigger the animation sequence
			//   gsap.to('.my-element', { duration: 2, y: -100 });
			// props.animations.sequence.play({ iterationCount: 1, range: [0, 2] })

			// Reset the scrollStart so the animation only triggers once
			setScrollStart(null)
		}
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animStart) {
				if (event.deltaY >= 25) {
					// if (isScroll) {
					// gsap.fromTo(
					// alert(styles.Container)
					// 	'.overlay',
					// 	{ opacity: 1 },
					// 	{
					// 		opacity: 0,
					// 		duration: 2,
					// 		delay: 1,
					// 	}
					// )
					// }
					// animations.sequence.play({
					// 	iterationCount: 1,
					// 	range: [0, 2],
					// })
					gsap.to(`${styles.Container}`, {
						opacity: 0,
						duration: 2,
					})
					setAnimStart(true)
				}
			}
		}
		// window.addEventListener('scroll', handleScroll)
		window.addEventListener('wheel', handleWheel)

		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('wheel', handleWheel)
		}
	}, [animStart])

	return <div className='test'>{children}</div>
}

export default EnterAnimation

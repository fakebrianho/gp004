import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'
import { animated } from '@react-spring/three'
import { a, useSpring } from '@react-spring/three'
import { useFrame, useThree } from '@react-three/fiber'
import { useContext } from 'react'
import { AnimationControlContext } from '@/components/AnimationControlContext'
import { useState } from 'react'
import { useRef } from 'react'
const Title = forwardRef((props, ref) => {
	const { position, scale, rotation, text, trigger } = props
	const { scene } = useThree()
	const animRef = useRef()
	animRef.current = false
	const AnimatedText = a(Text)
	const textRef = useRef()
	const startAnimation = useContext(AnimationControlContext)
	const [active, setActive] = useState(false)

	const { scaler } = useSpring({
		scaler: active ? 0.5 : 0.25,
	})
	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					// gsap.to(`.${styles.Container}`, {
					// 	opacity: 0,
					// 	duration: 1,
					// })
					alert('hi')
					animRef.current = true
				}
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false })
		return () => {
			window.removeEventListener('wheel', handleWheel)
		}
	}, [])

	// useImperativeHandle(
	// 	ref,
	// () => ({
	// 	getScale: () => textRef.current.scale.x,
	// 	setScale: (newScale) => (textRef.current.scale.x = newScale),
	// }),
	// []
	// )

	// useEffect(() => {
	// 	if (textRef) {
	// 		textRef.current.scale.x = scale[0]
	// 	}
	// }, [startAnimation])

	// useFrame(() => {
	// console.log(startAnimation)
	// })

	return (
		<AnimatedText
			ref={ref}
			onClick={() => setActive(!active)}
			font={'/static/fonts/bluunext-bold-webfont.woff'}
			scale={scaler}
			position={position}
		>
			{text}
		</AnimatedText>
	)
})
Title.displayName = 'Title'
export default Title

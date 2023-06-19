import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'
import { animated } from '@react-spring/three'
import { a, useSpring, easings } from '@react-spring/three'
import { useThree } from '@react-three/fiber'
import { useState } from 'react'
import { useRef } from 'react'
const Title = forwardRef((props, ref) => {
	const { position, scale, text } = props
	const animRef = useRef()
	animRef.current = false
	const AnimatedText = a(Text)
	const [active, setActive] = useState(false)

	const { scaler, positioner } = useSpring({
		scaler: active ? 0.1 : scale,
		positioner: active ? [0, position[1] / 2, 0] : position,
		config: {
			duration: 1000,
			easing: easeOutSine,
			// easing: t => t * (2 - t),  // An easing function (this one is for easeInOut)
		},
	})
	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					setActive(true)
					animRef.current = true
				}
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false })
		return () => {
			window.removeEventListener('wheel', handleWheel)
		}
	}, [])

	return (
		<AnimatedText
			ref={ref}
			onClick={() => setActive(!active)}
			font={'/static/fonts/bluunext-bold-webfont.woff'}
			scale={scaler}
			position={positioner}
		>
			{text}
		</AnimatedText>
	)
})
Title.displayName = 'Title'
export default Title

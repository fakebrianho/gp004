import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import { Text } from '@react-three/drei'
import { a, useSpring, easings } from '@react-spring/three'
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
		positioner: active ? [0, position[1] / 2, 0.2] : position,
		config: {
			duration: 1000,
			easing: easings.easeInOutSine,
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

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
	console.log(scale)
	const [active, setActive] = useState(false)

	const { scaler } = useSpring({
		scaler: active ? 0.5 : { scale },
	})
	console.log(scaler)
	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					setActive(!active)
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
			position={position}
		>
			{text}
		</AnimatedText>
	)
})
Title.displayName = 'Title'
export default Title

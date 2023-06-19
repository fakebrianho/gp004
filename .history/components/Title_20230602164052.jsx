import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'
import { animated } from '@react-spring/three'
import { a } from '@react-spring/three'
import { useFrame, useThree } from '@react-three/fiber'
import { useContext } from 'react'
import { AnimationControlContext } from '@/components/AnimationControlContext'
import { useRef } from 'react'
const Title = forwardRef((props, ref) => {
	const { position, scale, rotation, text, trigger } = props
	const { scene } = useThree()
	const AnimatedText = a(Text)
	const textRef = useRef()
	const startAnimation = useContext(AnimationControlContext)
	const { scaler } = useSpring({
		scaler: active
			? { x: 0.25, y: 0.25, z: 0.25 }
			: { x: 0.5, y: 0.5, z: 0.5 },
	})

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
			font={'/static/fonts/bluunext-bold-webfont.woff'}
			scale={scale}
			position={position}
		>
			{text}
		</AnimatedText>
	)
})
Title.displayName = 'Title'
export default Title

import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'
import { animated } from '@react-spring/three'
import { a } from '@react-spring/three'
import { useFrame, useThree } from '@react-three/fiber'
import { useContext } from 'react'
import { AnimationControlContext } from '@/components/AnimationControlContext'

const Title = forwardRef((props, ref) => {
	const { position, scale, rotation, text, trigger } = props
	const { scene } = useThree()
	const AnimatedText = a(Text)
	const textRef = useRef()
	const startAnimation = useContext(AnimationControlContext)

	useImperativeHandle(
		ref,
		() => ({
			getScale: () => textRef.current.scale.x,
			setScale: (newScale) => (textRef.current.scale.x = newScale),
		}),
		[]
	)

	useEffect(() => {
		if (textRef) {
			textRef.current.scale.x = scale[0]
		}
	}, [startAnimation])

	useFrame(() => {
		// console.log(startAnimation)
	})

	return (
		<AnimatedText
			ref={textRef}
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

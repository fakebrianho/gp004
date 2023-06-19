import React, { useState, useEffect, useRef } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'
import { animated } from '@react-spring/three'
import { a } from '@react-spring/three'
import { useFrame, useThree } from '@react-three/fiber'
import { useContext } from 'react'
import { AnimationControlContext } from '@/components/AnimationControlContext'
// import AnimatedCont
// import {AnimatedControlContext}
export default function Title({ position, scale, rotation, text, trigger }) {
	const { scene } = useThree()
	const AnimatedText = a(Text)
	const textRef = useRef()
	const startAnimation = useContext(AnimationControlContext)
	console.log(startAnimation)
	useEffect(() => {
		if (textRef) {
			textRef.current.scale.x = scale[0]
		}
	}, [scale])
	useFrame()
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
}

// export default Title

import React, { useState, useEffect, useRef } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'
import { animated } from '@react-spring/three'
import { a } from '@react-spring/three'
import { useThree } from '@react-three/fiber'

export default function Title({ position, scale, rotation, text }) {
	const { scene } = useThree()
	const AnimatedText = a(Text)
	const textRef = useRef()
	useEffect(() => {
		// Assume that the first child of the scene is a mesh
		const mesh = scene.children[0]

		// if (mesh) {
		// 	mesh.material.color.set(color)
		// }
	}, [scale])

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

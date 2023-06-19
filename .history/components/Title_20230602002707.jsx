import React, { useState, useEffect } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'
import { animated } from '@react-spring/three'

export default function Title({ position, scale, rotation, text }) {
	return (
		<animated.Text
			font={'/static/fonts/bluunext-bold-webfont.woff'}
			scale={scale}
			position={position}
		>
			{text}
		</animated.Text>
	)
}

// export default Title

import React, { useState, useEffect } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'
// import { a } from 'react-spring/three'

const Title = ({ position, scale, rotation, text }) => {
	return (
		<Text
			font={'/static/fonts/bluunext-bold-webfont.woff'}
			scale={scale}
			position={position}
		>
			{text}
		</Text>
	)
}

export default Title

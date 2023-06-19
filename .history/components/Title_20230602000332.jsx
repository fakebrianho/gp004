import React, { useState, useEffect } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'

export default function Title(props) {
	return (
		<Text
			font={'/static/fonts/bluunext-bold-webfont.woff'}
			scale={props.scale}
			position={props.position}
		>
			{props.text}
		</Text>
	)
}

import React, { useState, useEffect } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'

export default function Title(props) {
	// const [font, setFont] = useState(null)

	// useEffect(() => {
	// 	const fontLoader = new FontLoader()
	// 	const f = fontLoader.parse('/static/fonts/p2.json')
	// 	setFont(f)
	// }, [])

	console.log(font)

	// return font ? (
	// 	<Text
	// 		font={'/static/fonts/bluunext-bold-webfont.woff'}
	// 		position={props.position}
	// 		rotation={props.rotation}
	// 		scale={props.scale}
	// 	>
	// 		{props.text}
	// 	</Text>
	// ) : null
	return <Text>{props.text}</Text>
}

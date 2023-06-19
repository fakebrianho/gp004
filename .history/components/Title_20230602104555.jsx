import React, { useState, useEffect } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Text } from '@react-three/drei'
import { animated } from '@react-spring/three'
import { a } from '@react-spring/three'
export default function Title({ position, scale, rotation, text }) {
	const AnimatedText = a(Text)
	useEffect(() => {
		// Assume that the first child of the scene is a mesh
		const mesh = scene.children[0];
	
		if (mesh) {
		  mesh.material.color.set(color);
		}
	  }, [color, scene]);
	
	  return null;
	};
	
	return (
		<AnimatedText
			font={'/static/fonts/bluunext-bold-webfont.woff'}
			scale={scale}
			position={position}
		>
			{text}
		</AnimatedText>
	)
}

// export default Title

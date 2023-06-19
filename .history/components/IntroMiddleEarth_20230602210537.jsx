import { a, useSpring, easings } from '@react-spring/three'
import { useState, useRef, useEffect } from 'react'

export default function IntroMiddleEarth() {
	return (
		<mesh position={[0, 0, 3]}>
			<sphereGeometry args={[0.3, 16, 32]} />
			<meshBasicMaterial color={[0.23, 0.2, 0.57]} />
		</mesh>
	)
}

import { a, useSpring, easings } from '@react-spring/three'
import { useState, useRef, useEffect } from 'react'

export default function IntroMiddleEarth() {
	const animRef = useRef()
	// animRef.current = false
	// const AnimatedText = a(Text)
	const [active, setActive] = useState(false)
	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					setActive(true)
					animRef.current = true
				}
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false })
		return () => {
			window.removeEventListener('wheel', handleWheel)
		}
	}, [])
	return (
		<mesh position={[0, 0, 3]}>
			<sphereGeometry args={[0.3, 16, 32]} />
			<meshBasicMaterial color={[0.23, 0.2, 0.57]} />
		</mesh>
	)
}

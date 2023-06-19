import { a, useSpring, easings } from '@react-spring/three'
import { useState, useRef, useEffect } from 'react'

export default function IntroMiddleEarth() {
	const animRef = useRef()
	animRef.current = false
	const [active, setActive] = useState(false)
	const { position } = useSpring({
		position: active ? [0, 0, 0] : [0, 0, 3],
		config: {
			duration: 2000,
			easing: easings.easeInOutSine,
		},
	})
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
		<a.mesh position={position}>
			<sphereGeometry args={[0.12, 16, 32]} />
			<meshBasicMaterial color={[0.23, 0.2, 0.57]} />
		</a.mesh>
	)
}

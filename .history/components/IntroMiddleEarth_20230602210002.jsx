export default function IntroMiddleEarth() {
	return (
		<mesh position={[0, 0, -1]}>
			<sphereGeometry args={[0.1, 16, 32]} />
			<meshBasicMaterial color='blue' />
		</mesh>
	)
}

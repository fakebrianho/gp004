import { useMemo } from 'react'
const lerp = (a, b, t) => {
	return a * (1 - t) + b * t
}
export function getPositions(
	count,
	setting,
	minRadius,
	maxRadius,
	center,
	theatre
) {
	// const positionSet1 = useMemo(() => {
	if (theatre) {
		const pos = new Float32Array(count * 3)
		for (let i = 0; i < count; i++) {
			let theta = Math.random() * 2 * Math.PI
			let r = lerp(minRadius, minRadius, Math.random())
			let x = r * Math.sin(theta) + center[0]
			let y = (Math.random() - 0.5) * 0.1 + center[1]
			let z = r * Math.cos(theta) + center[2]
			pos.set([x, y, z], i * 3)
		}
		return pos
	} else {
		const pos = new Float32Array(count * 3)
		for (let i = 0; i < count; i++) {
			let theta = Math.random() * 2 * Math.PI
			let r = lerp(minRadius, maxRadius, Math.random())
			let x = r * Math.sin(theta) + center[0]
			let y = (Math.random() - 0.5) * 0.1 + center[1]
			let z = r * Math.cos(theta) + center[2]
			pos.set([x, y, z], i * 3)
		}
		return pos
	}
}

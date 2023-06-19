export const LoadImage = () => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.crossOrigin = 'Anonymous'
		img.src = path
		img.onload = () => {
			resolve(img)
		}
		img.onerror = (e) => {
			reject(e)
		}
	})
}

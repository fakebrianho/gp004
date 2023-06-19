import { createContext, useState } from 'react'

export const CanvasContext = createContext()

export function CanvasProvider({ children }) {
	const [canvas, setCanvas] = useState(null)

	return (
		<CanvasContext.Provider value={{ canvas, setCanvas }}>
			{children}
		</CanvasContext.Provider>
	)
}

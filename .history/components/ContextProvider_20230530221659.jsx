import { createContext, useState, useContext } from 'react'

export const CanvasContext = createContext()

export function CanvasProvider({ children }) {
	const [canvas, setCanvas] = useState(null)

	return (
		<CanvasContext.Provider value={{ canvas, setCanvas }}>
			{children}
		</CanvasContext.Provider>
	)
}

export function useCanvasContext() {
	return useContext(CanvasContext)
}

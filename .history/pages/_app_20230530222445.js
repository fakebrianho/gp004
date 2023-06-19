import '@/styles/globals.css'
import { GlobalCanvas } from '@14islands/r3f-scroll-rig'
import { CanvasProvider, useCanvasContext } from '@/components/ContextProvider'
export default function App({ Component, pageProps }) {
	return (
		<>
			<CanvasProvider>
				<Component {...pageProps} />
			</CanvasProvider>
		</>
	)
}

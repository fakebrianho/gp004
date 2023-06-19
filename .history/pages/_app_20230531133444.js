import '@/styles/globals.css'
import { GlobalCanvas } from '@14islands/r3f-scroll-rig'
import { CanvasProvider, useCanvasContext } from '@/components/ContextProvider'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps }) {
	return (
		<CanvasProvider>
			<AnimatePresence exitBeforeEnter>
				<Component {...pageProps} />
			</AnimatePresence>
		</CanvasProvider>
	)
}

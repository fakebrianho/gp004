import '@/styles/globals.css'
import { GlobalCanvas } from '@14islands/r3f-scroll-rig'
import { CanvasProvider, useCanvasContext } from '@/components/ContextProvider'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps }) {
	return (
		<CanvasProvider>
			<AnimatePresence wait>
				<Component {...pageProps} key={Router.route} />
			</AnimatePresence>
		</CanvasProvider>
	)
}

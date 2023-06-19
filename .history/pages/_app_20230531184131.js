import '@/styles/globals.css'
import { GlobalCanvas } from '@14islands/r3f-scroll-rig'
import { CanvasProvider, useCanvasContext } from '@/components/ContextProvider'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { Stats } from '@react-three/drei'
export default function App({ Component, pageProps }) {
	const router = useRouter()

	return (
		<CanvasProvider>
			<AnimatePresence wait>
				<Stats showPanel={0} className='stats' />

				<Component {...pageProps} key={router.route} />
			</AnimatePresence>
		</CanvasProvider>
	)
}

import '@/styles/globals.css'
import { GlobalCanvas } from '@14islands/r3f-scroll-rig'
import { CanvasProvider, useCanvasContext } from '@/components/ContextProvider'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { Stats } from '@react-three/drei'
export default function App({ Component, pageProps }) {
	const router = useRouter()
	extend({ OrbitControls })

	function Controls() {
		const controls = useRef()
		const { camera, gl } = useThree()
		useFrame(() => controls.current.update())
		return (
			<orbitControls
				ref={controls}
				args={[camera, gl.domElement]}
				enableDamping
				dampingFactor={0.1}
				rotateSpeed={0.5}
			/>
		)
	}

	return (
		<CanvasProvider>
			<AnimatePresence wait>
				{/* <Stats showPanel={0} className='stats' /> */}
				<Controls />
				<Component {...pageProps} key={router.route} />
			</AnimatePresence>
		</CanvasProvider>
	)
}

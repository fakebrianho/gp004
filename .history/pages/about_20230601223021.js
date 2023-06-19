import Layout from '@/components/Layout'
import Page2 from '@/components/Page2'
import { motion } from 'framer-motion'
import Overlay from '@/components/Overlay'
import EnterAnimation from '@/components/EnterAnimation'
import { useRef } from 'react'
const pageTransition = {
	out: {
		opacity: 0,
		y: 40,
		transition: {
			duration: 1.75,
		},
	},
	in: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.75,
			delay: 0.5,
		},
	},
}
export default function About() {
	const overlayRef = useRef()
	return (
		<motion.div
			variants={pageTransition}
			animate='in'
			initial='out'
			exit='out'
		>
			<EnterAnimation>
				<Overlay
					ref={overlayRef}
					content={'About'}
					scroll={true}
					read={false}
				/>
				<Layout>
					<Page2 />
				</Layout>
			</EnterAnimation>
		</motion.div>
	)
}

import Layout from '@/components/Layout'
import Page2 from '@/components/Page2'
import { motion } from 'framer-motion'

const pageTransition = {
	out: {
		opacity: 0,
		y: 40,
		transition: {
			duration: 0.75,
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
	return (
		<motion.div
			variants={pageTransition}
			animate='in'
			initial='out'
			exit='out'
		>
			<Layout>
				<Page2 />
			</Layout>
		</motion.div>
	)
}

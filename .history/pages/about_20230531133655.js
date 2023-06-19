import Layout from '@/components/Layout'
import Page2 from '@/components/Page2'
import { motion } from 'framer-motion'

const pageTransition = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { duration: 0.5 } },
	exit: { opacity: 0, transition: { duration: 0.5 } },
}
export default function About() {
	return (
		<motion.div
			initial='hidden'
			animate='show'
			exit='exit'
			variants={pageTransition}
		>
			<Layout>
				<Page2 />
			</Layout>
		</motion.div>
	)
}

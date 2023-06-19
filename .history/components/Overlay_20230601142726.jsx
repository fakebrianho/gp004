import React, { forwardRef } from 'react'
import styles from '@/styles/Overlay.module.css'
import localFont from 'next/font/local'
const myFont = localFont({ src: '../static/fonts/Optima.woff' })
const Overlay = forwardRef((props, ref) => {
	const _class = props.scroll ? 'overlay' : 'overlayNoScroll'
	const _about = props.scroll ? styles.About : styles.About2
	const _container = props.scroll ? styles.Container : styles.Container2
	return (
		<main className={`${myFont.className} ${_class}`}>
			<section className={_container} ref={ref}>
				<div className={_about}>
					<p>{props.content}</p>
				</div>
				{props.scroll && (
					<p className={styles.pAbout}>Scroll to Enter</p>
				)}
			</section>
		</main>
	)
})

Overlay.displayName = 'Overlay'
export default Overlay

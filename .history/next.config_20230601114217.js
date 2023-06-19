// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
}

module.exports = (phase, { defaultConfig }) => {
	const config = {
		...defaultConfig,
		webpack: (config, { isServer }) => {
			config.module.rules.push({
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'static/fonts/',
						publicPath: '/static/fonts/',
					},
				},
			})

			return config
		},
	}

	return { ...config, ...nextConfig }
}

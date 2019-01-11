module.exports = (env, options) => {
	const isProduction = options.mode === 'production'

	return {
		entry: `./src/index.html`,
		module: {
			rules: [
				{
					test: /\.html$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].html'
							},
						},
						'extract-loader',
						{
							loader: 'html-loader',
							options: {
								interpolate: true,
								minimize: isProduction,
							},
						},
						{
							loader: './src/dunder-loader',
							options: {
								minify: isProduction,
							},
						},
					],
				},
				{
					test: /\.svg$/,
					loader: 'html-loader',
				},
			],
		},
	}
}

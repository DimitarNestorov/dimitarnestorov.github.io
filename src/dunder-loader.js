const loaderUtils = require('loader-utils')

let currentLetterCode = 97
function getLetter() {
	if (currentLetterCode === 123) throw new Error("Over 26 different dunders")
	return String.fromCharCode(currentLetterCode++)
}

const values = {}

function mapToKeys(key) {
	if (values[key]) return
	values[key] = getLetter()
}

function reducer(accumulator, key) {
	const regex = new RegExp(key, 'g')
	return accumulator.replace(regex, values[key])
}

const matchRegex = /__(.*?)__/g
module.exports = function (source) {
	const options = loaderUtils.getOptions(this)
	if (!options.minify) return source

	source.match(matchRegex).forEach(mapToKeys)
	return Object.keys(values).reduce(reducer, source)
}

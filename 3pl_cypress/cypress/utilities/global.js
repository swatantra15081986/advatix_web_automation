const dynamic_globals = {}

const setGlobal = (key, value) => {
	dynamic_globals[key] = value
}

const getGlobal = (key) => {
	return dynamic_globals[key]
}

module.exports = {
	setGlobal,
	getGlobal
}


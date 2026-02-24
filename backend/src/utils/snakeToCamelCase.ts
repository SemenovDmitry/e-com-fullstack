const snakeToCamelCase = <T,>(data: Record<string, any>): T => {
	const result: Record<string, any> = {}
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
			result[camelCaseKey] = data[key]
		}
	}
	return result as T
}

export default snakeToCamelCase

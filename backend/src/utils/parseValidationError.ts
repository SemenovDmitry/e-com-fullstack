import type { ZodError } from 'zod'

const parseValidationError = (error: ZodError<unknown>) => {
	const fieldErrors: Record<string, string[]> = {}

	error.issues.forEach((issue) => {
		const path = issue.path.join('.')
		if (!fieldErrors[path]) {
			fieldErrors[path] = []
		}
		fieldErrors[path].push(issue.message)
	})

	return fieldErrors
}

export default parseValidationError

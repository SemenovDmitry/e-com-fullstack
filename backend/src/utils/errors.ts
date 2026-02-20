import type { ZodError } from 'zod'

import parseValidationError from './parseValidationError'

export type FieldErrors = Record<string, string[]>

export class ValidationError extends Error {
	public readonly statusCode = 400
	public readonly fieldErrors: FieldErrors

	constructor(message: string, fieldErrors?: FieldErrors) {
		super(message)
		this.name = 'ValidationError'
		this.fieldErrors = fieldErrors || {}
	}
}

export class ZodValidationError extends Error {
	public readonly statusCode = 400
	public readonly fieldErrors: FieldErrors

	constructor(error?: ZodError<unknown>) {
		const fieldErrors = error ? parseValidationError(error) : {}
		const message = error?.issues[0]?.message || 'Validation failed'

		super(message)
		this.name = 'ZodValidationError'
		this.fieldErrors = fieldErrors
	}
}

export class NotFoundError extends Error {
	public readonly statusCode = 404

	constructor(message: string = 'Resource not found') {
		super(message)
		this.name = 'NotFoundError'
	}
}

export class DatabaseError extends Error {
	public readonly statusCode = 500

	constructor(message: string, originalError?: unknown) {
		super(message)
		this.name = 'DatabaseError'
		if (originalError instanceof Error && originalError.stack) {
			this.stack = originalError.stack
		}
	}
}

export class InternalServerError extends Error {
	public readonly statusCode = 500

	constructor(message: string = 'Internal server error', originalError?: unknown) {
		super(message)
		this.name = 'InternalServerError'
		if (originalError instanceof Error && originalError.stack) {
			this.stack = originalError.stack
		}
	}
}

export interface AppError extends Error {
	statusCode?: number
}

export const isAppError = (error: unknown): error is AppError => {
	return error instanceof Error && 'statusCode' in error
}

export const getErrorStatusCode = (error: unknown): number => {
	if (isAppError(error)) {
		return error.statusCode || 500
	}
	return 500
}

export const getErrorMessage = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message
	}
	return 'Unknown error occurred'
}

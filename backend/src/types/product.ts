import type { IUUID } from './common'

export interface IProduct {
	id: IUUID
	name: string
	description: string
	price: number
	quantity: number
	createdAt: Date
	updatedAt: Date
}

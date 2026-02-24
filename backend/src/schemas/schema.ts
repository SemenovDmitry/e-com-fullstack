import z from "zod"

// Brand type for UUID
declare const __brand: unique symbol
type Brand<T, B> = T & { [__brand]: B }
export type IUUID = Brand<string, 'UUID'>

export const uuidSchema = z.uuid('Wrong ID format').min(1, 'ID is required')

export const idParamsSchema = z.object({
  id: uuidSchema,
})

// Should I separate schema from correct params values and business params?
// like price and quantity should be number, but that it shouldn't be negative is business logic.
export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().default(''),
  price: z.number().min(0, 'Price cannot be negative'),
  quantity: z.number().int().min(0, 'Quantity cannot be negative'),
})

export const updateProductSchema = createProductSchema.partial()

export type ICreateProductInput = z.infer<typeof createProductSchema>
export type IUpdateProductInput = z.infer<typeof updateProductSchema>
export type IProduct = ICreateProductInput & {
	id: IUUID
	createdAt: Date
	updatedAt: Date
}

export const emailSchema = z.email('Invalid email format')

export const phoneSchema = z.string().regex(/^\+?[\d\s\-()]{10,}$/, 'Invalid phone format').optional()

export const avatarSchema = z.url('Invalid URL format').optional()

export const addressSchema = z.string().min(1, 'Address is required').optional()

export const sendMagicLinkSchema = z.object({
  email: emailSchema,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: phoneSchema.optional(),
  avatar: avatarSchema.optional(),
  address: addressSchema.optional(),
})

export const userSchema = sendMagicLinkSchema.extend({
  id: uuidSchema,
  token: z.string().optional(),
  tokenExpiresAt: z.date().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ISendMagicLinkInput = z.infer<typeof sendMagicLinkSchema>
export type ICreateUserInput = ISendMagicLinkInput
export type IUser = z.infer<typeof userSchema>

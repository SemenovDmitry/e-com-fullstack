declare const __brand: unique symbol

type Brand<T, B> = T & { [__brand]: B }

export type IUUID = Brand<string, 'UUID'>

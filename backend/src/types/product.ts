export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductDto = Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProductDto = Partial<CreateProductDto>;

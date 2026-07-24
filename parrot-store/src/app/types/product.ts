export type ProductStatus = "available" | "sold" | "hidden";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;

  expectedAge: string;
  size: string;
  temperament: string;

  price: number;
  quantity: number;

  images: string[];
  video?: string;

  status: ProductStatus;
}

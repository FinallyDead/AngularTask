export interface Product {
  id: number;
  name: string;
  price: number;
  vat: number;
}

export interface ProductFormPayload {
  productName: string;
  productPrice: number;
  productVat: number;
}
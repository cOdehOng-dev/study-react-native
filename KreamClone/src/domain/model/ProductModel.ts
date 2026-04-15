export interface ProductModel {
  id: string;
  brand: string;
  name: string;
  imageUri: string;
  buyPrice: number;   // 즉시구매가
  sellPrice: number;  // 즉시판매가
  wishCount: number;
  category: string;
  isNew: boolean;
}

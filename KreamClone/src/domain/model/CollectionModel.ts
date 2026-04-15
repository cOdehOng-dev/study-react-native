export interface CollectionModel {
  id: string;
  title: string;
  description: string;
  imageUri: string;
  products: string[]; // productIds
}

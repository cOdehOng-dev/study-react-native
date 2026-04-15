import { ProductModel } from '../../domain/model/ProductModel';

const makeProduct = (
  id: string,
  brand: string,
  name: string,
  buyPrice: number,
  sellPrice: number,
  category: string,
  isNew = false,
): ProductModel => ({
  id,
  brand,
  name,
  imageUri: `https://picsum.photos/seed/${id}/300/300`,
  buyPrice,
  sellPrice,
  wishCount: parseInt(id.replace(/\D/g, '') || '1', 10) * 137 % 10000,
  category,
  isNew,
});

export const MOCK_TRENDING: ProductModel[] = [
  makeProduct('p001', 'Nike', 'Air Force 1 Low White', 119000, 110000, '스니커즈'),
  makeProduct('p002', 'New Balance', '530 White Silver', 139000, 132000, '스니커즈'),
  makeProduct('p003', 'Adidas', 'Samba OG White Black', 149000, 141000, '스니커즈'),
  makeProduct('p004', 'Nike', 'Dunk Low Retro White Black', 169000, 159000, '스니커즈'),
  makeProduct('p005', 'Converse', 'Chuck Taylor All Star OX', 89000, 82000, '스니커즈'),
  makeProduct('p006', 'Vans', 'Old Skool Classic Black', 99000, 91000, '스니커즈'),
];

export const MOCK_RANKING: ProductModel[] = [
  makeProduct('r001', 'Nike', 'Air Jordan 1 Retro High OG', 289000, 275000, '스니커즈'),
  makeProduct('r002', 'Nike', 'Air Max 90 White', 189000, 179000, '스니커즈'),
  makeProduct('r003', 'Adidas', 'Yeezy 350 V2 Bone', 399000, 385000, '스니커즈'),
  makeProduct('r004', 'New Balance', '2002R White', 219000, 208000, '스니커즈'),
  makeProduct('r005', 'Nike', 'Dunk High Retro Black', 199000, 188000, '스니커즈'),
];

export const MOCK_NEW_ARRIVALS: ProductModel[] = [
  makeProduct('n001', 'Salomon', 'XT-6 White Black', 249000, 238000, '스니커즈', true),
  makeProduct('n002', 'Asics', 'Gel-1130 Cream White', 179000, 169000, '스니커즈', true),
  makeProduct('n003', 'Adidas', 'Gazelle Bold Blue', 159000, 149000, '스니커즈', true),
  makeProduct('n004', 'Nike', 'Air Rift White', 139000, 129000, '스니커즈', true),
  makeProduct('n005', 'Puma', 'Speedcat White', 129000, 119000, '스니커즈', true),
];

export const ALL_PRODUCTS: ProductModel[] = [
  ...MOCK_TRENDING,
  ...MOCK_RANKING,
  ...MOCK_NEW_ARRIVALS,
];


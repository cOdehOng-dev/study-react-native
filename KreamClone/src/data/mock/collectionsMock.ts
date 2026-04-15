import { CollectionModel } from '../../domain/model/CollectionModel';

export const MOCK_COLLECTIONS: CollectionModel[] = [
  {
    id: 'c001',
    title: '봄 스니커즈 컬렉션',
    description: '2026 SS 시즌 추천 스니커즈',
    imageUri: 'https://picsum.photos/seed/col1/400/300',
    products: ['p001', 'n001', 'n002'],
  },
  {
    id: 'c002',
    title: '레트로 바이브',
    description: '빈티지 무드의 클래식 스니커즈',
    imageUri: 'https://picsum.photos/seed/col2/400/300',
    products: ['p002', 'p003', 'r002'],
  },
  {
    id: 'c003',
    title: '올블랙 코디',
    description: '블랙 컬러웨이 총집합',
    imageUri: 'https://picsum.photos/seed/col3/400/300',
    products: ['r001', 'r005', 'p006'],
  },
];

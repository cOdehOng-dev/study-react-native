import { BannerModel } from '../../domain/model/BannerModel';

export const MOCK_BANNERS_DATA: BannerModel[] = [
  {
    id: 'b001',
    imageUri: 'https://picsum.photos/seed/banner1/800/400',
    title: '봄 신상 스니커즈',
    subtitle: '2026 SS 컬렉션 선공개',
    linkType: 'event',
    linkId: 'e001',
  },
  {
    id: 'b002',
    imageUri: 'https://picsum.photos/seed/banner2/800/400',
    title: 'KREAM ONLY',
    subtitle: '한정판 드롭 알림 신청',
    linkType: 'brand',
    linkId: 'br001',
  },
  {
    id: 'b003',
    imageUri: 'https://picsum.photos/seed/banner3/800/400',
    title: '에어 조던 시즌',
    subtitle: '조던 브랜드 전체 모아보기',
    linkType: 'brand',
    linkId: 'br002',
  },
];

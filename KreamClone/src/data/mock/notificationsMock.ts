import { NotificationModel } from '../../domain/model/NotificationModel';

export const MOCK_NOTIFICATIONS: NotificationModel[] = [
  {
    id: 'notif001',
    type: '거래',
    title: '입찰이 체결되었습니다',
    body: 'Nike Air Force 1 Low 265mm 구매 입찰이 체결되었습니다.',
    isRead: false,
    createdAt: '2026-04-14T10:30:00Z',
    linkId: 'p001',
  },
  {
    id: 'notif002',
    type: '이벤트',
    title: '봄 신상 스니커즈 특가 시작!',
    body: '관심 상품이 특가 이벤트에 포함되었습니다.',
    isRead: false,
    createdAt: '2026-04-14T09:00:00Z',
    linkId: 'e001',
  },
  {
    id: 'notif003',
    type: '찜',
    title: '찜한 상품 가격이 하락했어요',
    body: 'Adidas Yeezy 350 V2 Bone 가격이 15,000원 하락했습니다.',
    isRead: true,
    createdAt: '2026-04-13T18:00:00Z',
    linkId: 'r003',
  },
  {
    id: 'notif004',
    type: '시스템',
    title: 'KREAM 앱 업데이트 안내',
    body: '더 나은 서비스를 위해 앱을 업데이트해 주세요.',
    isRead: true,
    createdAt: '2026-04-12T12:00:00Z',
  },
];

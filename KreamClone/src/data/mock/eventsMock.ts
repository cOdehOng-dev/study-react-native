import { EventModel } from '../../domain/model/EventModel';

export const MOCK_EVENTS: EventModel[] = [
  {
    id: 'e001',
    title: '봄 신상 스니커즈 특가',
    description: '2026 SS 신규 입고 상품 최대 15% 할인',
    imageUri: 'https://picsum.photos/seed/event1/600/400',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    isActive: true,
  },
  {
    id: 'e002',
    title: 'KREAM 포인트 2배 적립',
    description: '이번 달 모든 구매에 포인트 2배',
    imageUri: 'https://picsum.photos/seed/event2/600/400',
    startDate: '2026-04-14',
    endDate: '2026-04-21',
    isActive: true,
  },
  {
    id: 'e003',
    title: '첫 거래 쿠폰 증정',
    description: '첫 거래 완료 시 5,000원 쿠폰 즉시 지급',
    imageUri: 'https://picsum.photos/seed/event3/600/400',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    isActive: true,
  },
];

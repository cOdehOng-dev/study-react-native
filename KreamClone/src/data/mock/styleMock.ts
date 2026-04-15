import { StyleModel } from '../../domain/model/StyleModel';

const makeStyle = (
  id: string,
  userId: string,
  username: string,
  description: string,
  taggedProductIds: string[],
  likeCount: number,
): StyleModel => ({
  id,
  userId,
  username,
  userAvatar: `https://picsum.photos/seed/avatar-${userId}/80/80`,
  imageUri: `https://picsum.photos/seed/style-${id}/400/400`,
  description,
  likeCount,
  commentCount: Math.floor(likeCount / 10),
  taggedProductIds,
  createdAt: '2026-04-14T10:00:00Z',
  isLiked: false,
});

export const MOCK_STYLES: StyleModel[] = [
  makeStyle('s001', 'u001', 'sneaker_king', '오늘의 스타일 에어포스와 함께 🤍', ['p001', 'p003'], 1280),
  makeStyle('s002', 'u002', 'style_daily', '뉴발란스 530 일상 코디 ✨', ['p002'], 943),
  makeStyle('s003', 'u003', 'kream_lover', '삼바 OG 요즘 핫하다 🔥', ['p003'], 2100),
  makeStyle('s004', 'u004', 'minimal_fit', '던크로우 올블랙 코디 🖤', ['p004'], 1550),
  makeStyle('s005', 'u001', 'sneaker_king', '척테일러 클래식 화이트 여름룩 ☀️', ['p005'], 820),
  makeStyle('s006', 'u005', 'urban_style', '반스 올드스쿨 스트릿룩 🛹', ['p006'], 1030),
  makeStyle('s007', 'u006', 'jordan_fan', '조던1 하이 레트로 코디 💎', ['r001'], 3200),
  makeStyle('s008', 'u007', 'ootd_daily', '에어맥스 90 여름 코디 🌊', ['r002'], 1760),
  makeStyle('s009', 'u008', 'hype_korea', '이지 350 본 코디 🤎', ['r003'], 2800),
  makeStyle('s010', 'u002', 'style_daily', '뉴발 2002R 봄 코디 🌸', ['r004'], 1400),
  makeStyle('s011', 'u009', 'grail_hunter', '살로몬 XT-6 고프코어 🏔️', ['n001'], 2500),
  makeStyle('s012', 'u010', 'clean_aesthetic', '아식스 젤-1130 크림 코디 🤍', ['n002'], 1900),
];

export const MOCK_USER_STYLES: Record<string, StyleModel[]> = {
  u001: MOCK_STYLES.filter((s) => s.userId === 'u001'),
  u002: MOCK_STYLES.filter((s) => s.userId === 'u002'),
};

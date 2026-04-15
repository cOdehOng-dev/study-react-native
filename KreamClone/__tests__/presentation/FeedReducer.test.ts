import { feedReducer } from '../../src/presentation/feed/mvi/FeedReducer';
import { initialFeedState } from '../../src/presentation/feed/mvi/FeedState';
import { StyleModel } from '../../src/domain/model/StyleModel';

const mockStyle: StyleModel = {
  id: 's001',
  userId: 'u001',
  username: 'sneaker_king',
  userAvatar: 'https://picsum.photos/seed/avatar-u001/80/80',
  imageUri: 'https://picsum.photos/seed/style-s001/400/400',
  description: '오늘의 스타일',
  likeCount: 100,
  commentCount: 10,
  taggedProductIds: ['p001'],
  createdAt: '2026-04-14T10:00:00Z',
  isLiked: false,
};

describe('feedReducer', () => {
  it('SET_LOADING: isLoading 업데이트', () => {
    const result = feedReducer(initialFeedState, { type: 'SET_LOADING', isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  it('LOAD_SUCCESS: 스타일 목록 저장, 로딩 해제', () => {
    const loadingState = { ...initialFeedState, isLoading: true };
    const result = feedReducer(loadingState, { type: 'LOAD_SUCCESS', styles: [mockStyle] });
    expect(result.isLoading).toBe(false);
    expect(result.styles).toHaveLength(1);
    expect(result.error).toBeNull();
  });

  it('SET_ERROR: 에러 저장, 로딩 해제', () => {
    const result = feedReducer(initialFeedState, { type: 'SET_ERROR', error: '에러 발생' });
    expect(result.error).toBe('에러 발생');
    expect(result.isLoading).toBe(false);
  });

  it('TOGGLE_LIKE: 좋아요 토글 — false → true, likeCount +1', () => {
    const state = { ...initialFeedState, styles: [mockStyle] };
    const result = feedReducer(state, { type: 'TOGGLE_LIKE', styleId: 's001' });
    expect(result.styles[0].isLiked).toBe(true);
    expect(result.styles[0].likeCount).toBe(101);
  });

  it('TOGGLE_LIKE: 좋아요 토글 — true → false, likeCount -1', () => {
    const likedStyle = { ...mockStyle, isLiked: true, likeCount: 101 };
    const state = { ...initialFeedState, styles: [likedStyle] };
    const result = feedReducer(state, { type: 'TOGGLE_LIKE', styleId: 's001' });
    expect(result.styles[0].isLiked).toBe(false);
    expect(result.styles[0].likeCount).toBe(100);
  });

  it('REFRESH: 로딩 상태 시작, 에러 초기화', () => {
    const errorState = { ...initialFeedState, error: '이전 에러', isLoading: false };
    const result = feedReducer(errorState, { type: 'REFRESH' });
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('알 수 없는 액션: 상태 유지', () => {
    const result = feedReducer(initialFeedState, { type: 'UNKNOWN' } as never);
    expect(result).toEqual(initialFeedState);
  });
});

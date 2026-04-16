// __tests__/mvi/HomeReducer.test.ts
import { homeReducer } from '../../src/presentation/mvi/home/HomeReducer';
import { initialHomeState } from '../../src/presentation/mvi/home/HomeState';
import { HomeContent } from '../../src/domain/model/HomeContent';

const mockContent: HomeContent = {
  notice: { id: 'n1', tag: '공지', message: '테스트 공지' },
  adBanner: { id: 'a1', title: '테스트 배너', subtitle: '설명', imageUrl: '', isAd: true, indicatorLabel: '1/1' },
  productSections: [],
  guideSection: { title: '가이드', tabLabel: '더보기', guides: [] },
  flightDeals: { title: '땡처리', subtitle: '오늘 특가', backgroundImageUrl: '', deals: [], buttonLabel: '더보기' },
  bannerList: [],
  nolLive: { title: 'NOL LIVE', subtitle: '라이브', lives: [] },
};

describe('HomeReducer', () => {
  it('LOAD_HOME_CONTENT: isLoading을 true로 변경한다', () => {
    const state = homeReducer(initialHomeState, { type: 'LOAD_HOME_CONTENT' });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('LOAD_HOME_CONTENT_SUCCESS: content를 저장하고 isLoading을 false로 변경한다', () => {
    const loadingState = { ...initialHomeState, isLoading: true };
    const state = homeReducer(loadingState, {
      type: 'LOAD_HOME_CONTENT_SUCCESS',
      payload: mockContent,
    });
    expect(state.isLoading).toBe(false);
    expect(state.content).toEqual(mockContent);
    expect(state.error).toBeNull();
  });

  it('LOAD_HOME_CONTENT_FAILURE: error를 저장하고 isLoading을 false로 변경한다', () => {
    const loadingState = { ...initialHomeState, isLoading: true };
    const state = homeReducer(loadingState, {
      type: 'LOAD_HOME_CONTENT_FAILURE',
      payload: '네트워크 오류',
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('네트워크 오류');
    expect(state.content).toBeNull();
  });

  it('LOAD_HOME_CONTENT: 이전 error를 초기화한다', () => {
    const errorState = { ...initialHomeState, error: '이전 에러' };
    const state = homeReducer(errorState, { type: 'LOAD_HOME_CONTENT' });
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(true);
  });

  it('unknown action: 상태를 변경하지 않는다', () => {
    const action = { type: 'UNKNOWN' } as any;
    const state = homeReducer(initialHomeState, action);
    expect(state).toBe(initialHomeState);
  });
});

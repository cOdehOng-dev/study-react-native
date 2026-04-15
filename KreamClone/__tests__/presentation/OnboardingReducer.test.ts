import { onboardingReducer } from '../../src/presentation/onboarding/mvi/OnboardingReducer';
import { initialOnboardingState } from '../../src/presentation/onboarding/mvi/OnboardingState';

describe('OnboardingReducer', () => {
  it('SET_LOADING true로 변경', () => {
    const result = onboardingReducer(
      initialOnboardingState,
      { type: 'SET_LOADING', isLoading: true },
    );
    expect(result.isLoading).toBe(true);
  });

  it('SET_ERROR 에러 메시지 설정', () => {
    const result = onboardingReducer(
      initialOnboardingState,
      { type: 'SET_ERROR', error: '로그인 실패' },
    );
    expect(result.error).toBe('로그인 실패');
  });

  it('CLEAR_ERROR 에러 초기화', () => {
    const stateWithError = { ...initialOnboardingState, error: '에러' };
    const result = onboardingReducer(stateWithError, { type: 'CLEAR_ERROR' });
    expect(result.error).toBeNull();
  });

  it('LOGIN_SUCCESS 인증 완료', () => {
    const result = onboardingReducer(
      initialOnboardingState,
      { type: 'LOGIN_SUCCESS' },
    );
    expect(result.isAuthenticated).toBe(true);
    expect(result.isLoading).toBe(false);
  });
});

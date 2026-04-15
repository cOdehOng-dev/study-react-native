export type OnboardingAction =
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGIN_SUCCESS' }
  | { type: 'REGISTER_SUCCESS' };

import { OnboardingAction } from './OnboardingAction';
import { OnboardingState } from './OnboardingState';

export function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction,
): OnboardingState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return { ...state, isAuthenticated: true, isLoading: false, error: null };
    default:
      return state;
  }
}

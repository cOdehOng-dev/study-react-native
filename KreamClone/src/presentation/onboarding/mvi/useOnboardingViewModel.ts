import { useReducer, useCallback } from 'react';
import { onboardingReducer } from './OnboardingReducer';
import { initialOnboardingState } from './OnboardingState';
import { LoginUseCase } from '../../../domain/usecase/LoginUseCase';
import { RegisterUseCase } from '../../../domain/usecase/RegisterUseCase';

const loginUseCase = new LoginUseCase();
const registerUseCase = new RegisterUseCase();

export function useOnboardingViewModel() {
  const [state, dispatch] = useReducer(onboardingReducer, initialOnboardingState);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      await loginUseCase.execute({ email, password });
      dispatch({ type: 'LOGIN_SUCCESS' });
      return true;
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message });
      return false;
    }
  }, []);

  const register = useCallback(async (
    email: string, password: string, name: string,
  ): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      await registerUseCase.execute({ email, password, name });
      dispatch({ type: 'REGISTER_SUCCESS' });
      return true;
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message });
      return false;
    }
  }, []);

  const clearError = useCallback(() => dispatch({ type: 'CLEAR_ERROR' }), []);

  return { state, login, register, clearError };
}

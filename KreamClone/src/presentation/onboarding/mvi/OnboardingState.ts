export interface OnboardingState {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export const initialOnboardingState: OnboardingState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

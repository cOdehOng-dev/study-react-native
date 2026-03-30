import { useAppSelector } from './hooks';

export default function useUser() {
  return useAppSelector(state => state.auth.user);
}

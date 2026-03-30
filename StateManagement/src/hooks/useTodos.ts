import { useAppSelector } from './hooks';

export default function useTodos() {
  return useAppSelector(state => state.todos);
}

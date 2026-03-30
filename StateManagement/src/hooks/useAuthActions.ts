import { bindActionCreators } from '@reduxjs/toolkit';
import { authorize, logout } from '../slices/authSlice';
import { useAppDispatch } from './hooks';
import { useMemo } from 'react';

export default function useAuthActions() {
  const dispatch = useAppDispatch();
  return useMemo(
    () => bindActionCreators({ authorize, logout }, dispatch),
    [dispatch],
  );
}

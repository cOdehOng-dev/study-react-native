import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { add, remove, toggle } from '../slices/todos';

export default function useTodosActions() {
  const dispatch = useDispatch();
  return useMemo(
    () =>
      bindActionCreators(
        {
          add,
          remove,
          toggle,
        },
        dispatch,
      ),
    [dispatch],
  );
}

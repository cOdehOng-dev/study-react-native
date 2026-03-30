import { useCallback, useEffect } from 'react';
import { fetchPosts } from '../slices/posts';
import { useAppDispatch, useAppSelector } from './hooks';

type Props = {
  enabled?: boolean;
};

export default function usePosts({ enabled = true }: Props) {
  const posts = useAppSelector(state => state.posts.posts);
  const dispatch = useAppDispatch();
  const fetchData = useCallback(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    fetchData();
  }, [enabled, fetchData]);

  return {
    ...posts,
    refetch: fetchData,
  };
}

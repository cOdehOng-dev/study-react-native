import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { getPosts } from '../api/getPosts';
import { Post } from '../api';

export const fetchPosts = createAsyncThunk('posts/fetchUsers', getPosts);

interface PostState {
  posts: {
    loading: boolean;
    data: Post[] | null;
    error: SerializedError | null;
  };
}

const initialState: PostState = {
  posts: {
    loading: false,
    data: null,
    error: null,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        console.log('로딩');
        state.posts = {
          loading: true,
          data: null,
          error: null,
        };
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        console.log('성공', action.payload);
        state.posts.data = action.payload;
        state.posts.loading = false;
      })
      .addCase(
        fetchPosts.rejected,
        (state, action: ReturnType<typeof fetchPosts.rejected>) => {
          console.log('실패', action.error);
          state.posts.error = action.error;
          state.posts.loading = false;
        },
      );
  },
});

export default postsSlice.reducer;

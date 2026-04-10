import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import todoReducer from '../slices/todos';
import postReducer from '../slices/posts';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

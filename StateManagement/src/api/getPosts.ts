import axios from 'axios';
import { Post } from '.';

export async function getPosts() {
  const respose = await axios.get<Post[]>(
    'https://jsonplaceholder.typicode.com/posts',
  );
  return respose.data;
}

import firestore from '@react-native-firebase/firestore';
import { User } from './users';

const postCollection = firestore().collection('posts');

export function createPost({
  user,
  photoURL,
  description,
}: {
  user: User;
  photoURL: string;
  description: string;
}) {
  return postCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

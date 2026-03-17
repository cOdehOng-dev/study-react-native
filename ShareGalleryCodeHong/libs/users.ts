import firestore from '@react-native-firebase/firestore';

export type User = {
  id: string;
  displayName: string;
  photoUrl?: string | null;
};

export const userCollection = firestore().collection('users');

export function createUser({ id, displayName, photoUrl }: User) {
  return userCollection.doc(id).set({
    id,
    displayName,
    photoUrl,
  });
}

export async function getUser(id: string) {
  const doc = await userCollection.doc(id).get();
  const data = doc.data();
  if (!data) {
    return undefined;
  }
  const user: User = {
    id: data.id,
    displayName: data.displayName,
    photoUrl: data.photoUrl ?? null,
  };
  return user;
}

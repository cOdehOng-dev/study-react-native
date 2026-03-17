import { createContext, Dispatch, useContext, useState } from 'react';
import { User } from '../libs/users';

type UserContextProps = {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextProps | null>(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('Cannot find UserContextProvider');
  }
  return userContext;
}

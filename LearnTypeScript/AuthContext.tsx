import React, { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  name: string;
}

interface AuthContextType {
  user: User | null;
  setUser(user: User): void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AutchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('AuthContext not found');
  }
  return auth;
}

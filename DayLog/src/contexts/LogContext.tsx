import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

// Context에 담길 값의 타입 정의
type LogContextType = {
  logs: string[];
  setLogs: Dispatch<SetStateAction<string[]>>;
}

// createContext 초기값을 undefined로 설정 (실제 값은 Provider에서 주입)
const LogContext = createContext<LogContextType>({} as LogContextType);

type Props = {
  children: ReactNode;
}

export function LogContextProvider({ children }: Props) {
  const [logs, setLogs] = useState<string[]>([]);

  return (
    <LogContext.Provider value={{ logs, setLogs }}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
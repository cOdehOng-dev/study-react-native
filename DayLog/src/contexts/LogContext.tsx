import { createContext, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type LogContextType = {
  logs: LogProps[];
  onCreate: (log: LogProps) => void;
};

export type LogProps = {
  id: string;
  title: string;
  body: string;
  date: string;
};

const LogContext = createContext<LogContextType>({
  logs: [],
  onCreate: () => {},
});

export function LogContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logs, setLogs] = useState<LogProps[]>(
    Array.from({ length: 10 })
      .map((_, index) => ({
        id: uuidv4(),
        title: `제목 ${index + 1}`,
        body: `내용 ${index + 1}`,
        date: new Date().toISOString(),
      }))
      .reverse(),
  );

  const onCreate = ({ id, title, body, date }: LogProps) => {
    const log = {
      id,
      title,
      body,
      date,
    };

    setLogs([log, ...logs]);
  };

  return (
    <LogContext.Provider value={{ logs, onCreate }}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;

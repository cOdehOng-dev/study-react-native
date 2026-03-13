import { createContext, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type LogContextProps = {
  logs: LogProps[];
  onCreate: (log: LogProps) => void;
  onModify: (log: LogProps) => void;
  onRemove: (id: string) => void;
};

export type LogProps = {
  id: string;
  title: string;
  body: string;
  date: string;
};

const LogContext = createContext<LogContextProps>({
  logs: [],
  onCreate: () => {},
  onModify: () => {},
  onRemove: () => {},
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

  const onModify = (modified: LogProps) => {
    const nextLLogs = logs.map(log =>
      log.id === modified.id ? modified : log,
    );
    setLogs(nextLLogs);
  };

  const onRemove = (id: string) => {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs);
  };

  return (
    <LogContext.Provider value={{ logs, onCreate, onModify, onRemove }}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;

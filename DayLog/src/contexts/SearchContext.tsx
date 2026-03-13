import { createContext, ReactNode, useState } from 'react';

type SearchContextProps = {
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
};

const SearchContext = createContext<SearchContextProps>({
  keyword: '',
  onChangeKeyword: () => {},
});

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [keyword, setKeyword] = useState('');

  const onChangeKeyword = keyword => {
    setKeyword(keyword);
  };

  return (
    <SearchContext.Provider value={{ keyword, onChangeKeyword }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;

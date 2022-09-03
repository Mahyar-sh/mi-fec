import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input } from 'antd';

import { debounce } from '../../utils/debounce';

type SearchFieldProps = {
  search: (term: string) => void;
  resetSearch: () => void;
};

const SearchField = ({ search, resetSearch }: SearchFieldProps) => {
  const [searchTerm, setSearchTerm] = useState<string>();

  console.log('SEARCH FIELD RENDER');
  const debouncedSearch = useMemo(() => {
    return debounce(2000, (term) => {
      if (searchTerm !== '') {
        search(term.toLowerCase());
      } else {
        resetSearch();
      }
    });
  }, []);

  useEffect(() => {
    if (searchTerm !== undefined) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, search, resetSearch, debouncedSearch]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return <Input value={searchTerm} onChange={handleInput} />;
};

export const MemoizedSearchField = React.memo(SearchField);

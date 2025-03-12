import { useState, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';

export function useSpaSearch(initialData) {
  const [searchTerm, setSearchTerm] = useState('');
  const [spas] = useState(initialData);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const filteredSpas = useMemo(() => 
    spas.filter(spa =>
      spa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spa.location.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [spas, searchTerm]
  );

  return {
    searchTerm,
    filteredSpas,
    handleSearch: debouncedSearch
  };
} 
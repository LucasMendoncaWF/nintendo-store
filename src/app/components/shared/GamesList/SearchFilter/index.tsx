import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import searchIcon from 'assets/images/search.png';

import './searchFilter.scss';

interface Props {
  onSetSearchTerm: (name: string) => void;
  searchTerm: string;
}

let timeout: ReturnType<typeof setTimeout>;
export default function SearchFilter({ onSetSearchTerm }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [internSearchTerm, setInternSearchTerm] = useState<string | undefined>(
    undefined,
  );
  const addedFromUrl = useRef(false);

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (internSearchTerm !== undefined) {
        onSetSearchTerm(internSearchTerm);
        setSearchParams(
          internSearchTerm ? { searchQuery: internSearchTerm } : {},
        );
      }
    }, 300);
  }, [internSearchTerm, onSetSearchTerm, setSearchParams]);

  useEffect(() => {
    const value = searchParams.get('searchQuery');
    if (value && !internSearchTerm && !addedFromUrl.current) {
      setInternSearchTerm(value);
      addedFromUrl.current = true;
    }
  }, [searchParams, internSearchTerm]);

  return (
    <div className="search-input">
      <input
        value={internSearchTerm}
        onChange={(e) => setInternSearchTerm(e.target.value)}
      />
      <img src={searchIcon} alt="search input" />
    </div>
  );
}

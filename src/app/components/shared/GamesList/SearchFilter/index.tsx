import { useEffect, useRef, useState } from 'react';
import './searchFilter.scss';
import searchIcon from 'assets/images/search.png';
import { useSearchParams } from 'react-router-dom';

interface Props {
  onSetSearchTerm: (name: string) => void;
  searchTerm: string;
}

let timeout: ReturnType<typeof setTimeout>;
export default function SearchFilter ({onSetSearchTerm}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [internSearchTerm, setInternSearchTerm] = useState('');
  const isEditing = useRef(false);

  useEffect(() => {
    if(timeout) {
      clearTimeout(timeout);
    }
    isEditing.current = true;
    timeout = setTimeout(() => {
      isEditing.current = false;
      onSetSearchTerm(internSearchTerm);
      setSearchParams(internSearchTerm ? {searchQuery: internSearchTerm} : {});
    }, 300);
  }, [internSearchTerm, onSetSearchTerm, setSearchParams]);

  useEffect(() => {
    const value = searchParams.get('searchQuery');
    if(value && !internSearchTerm && !isEditing) {
      setInternSearchTerm(value);
    }
  }, [searchParams, internSearchTerm])

  return (
    <div className='search-input'>
      <input value={internSearchTerm} onChange={(e) => setInternSearchTerm(e.target.value)} />
      <img src={searchIcon} alt="search input" />
    </div>
  )
}
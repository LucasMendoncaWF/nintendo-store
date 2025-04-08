import { useState } from 'react';
import './wishlist.scss';
import SearchFilter from 'app/components/shared/GamesList/SearchFilter';
import GamesList from 'app/components/shared/GamesList';

export default function Wishlist () {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="store-container">
    <SearchFilter 
      onSetSearchTerm={(value) => {
        setSearchTerm(value);
      }} 
      searchTerm={searchTerm}
    />
    <GamesList searchTerm={searchTerm} setCurrentPage={setCurrentPage} currentPage={currentPage} type="wishlist"/>
    </div>
  )
}
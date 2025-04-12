import { useState } from 'react';
import SearchFilter from 'app/components/shared/GamesList/SearchFilter';
import GamesList from 'app/components/shared/GamesList';
import { useGetAllGames, useGetTotalPages } from 'app/services/gamesSearch';
import Pagination from 'app/components/shared/GamesList/Pagination';
import './store.scss';

export default function Store () {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: games,
    isError,
    isLoading,
  } = useGetAllGames({searchTerm, page: currentPage});

  const {
    data: totalPages,
  } = useGetTotalPages({searchTerm, page: currentPage});

  return (
    <div className="store-container">
    <SearchFilter 
      onSetSearchTerm={(value) => {
        setSearchTerm(value);
      }} 
      searchTerm={searchTerm}
    />
    <GamesList 
      games={games}
      hasError={isError}
      isEmptyResponse={!isError && !games?.length && !isLoading}
      isLoading={isLoading}
      title='All Games'
      hasAutoScroll
    />
    <Pagination gamesLength={games?.length} totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}/>
    </div>
  )
}
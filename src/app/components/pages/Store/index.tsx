import { useCallback, useEffect, useState } from 'react';
import './store.scss';
import SearchFilter from 'app/components/shared/GamesList/SearchFilter';
import GamesList from 'app/components/shared/GamesList';
import { GameModel } from 'app/models/gameModel';
import { getAllGames, getTotalPages, maxPerPage } from 'app/services/gamesSearch';
import Pagination from 'app/components/shared/GamesList/Pagination';

export default function Store () {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState<GameModel[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [hasError, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getGames = useCallback(async () => {
    const gamesResponse = await getAllGames({searchTerm, page: currentPage});
    window.scrollTo({behavior: 'smooth', top: 0})
    if(gamesResponse.status) {
      setGames([]);
      setError(true);
      setIsLoading(false);
      return;
    }

    if(gamesResponse) {
      setGames(gamesResponse);
      setIsLoading(false);
      const count = await getTotalPages({searchTerm, page: currentPage});
      setTotalPages(count.count/maxPerPage);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    getGames();
  }, [getGames, searchTerm]);

  const showPagination = totalPages > 1;

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
      hasError={hasError}
      isEmptyResponse={!hasError && !games.length && !isLoading}
      isLoading={isLoading}
      title='All Games'
    />
    
    {setCurrentPage && showPagination && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}/>}
    </div>
  )
}
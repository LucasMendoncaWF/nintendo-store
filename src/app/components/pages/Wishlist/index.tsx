import { useCallback, useEffect, useState } from 'react';
import './wishlist.scss';
import GamesList from 'app/components/shared/GamesList';
import { GameModel } from 'app/models/gameModel';
import { getAllGames, getTotalPages, maxPerPage } from 'app/services/gamesSearch';
import Pagination from 'app/components/shared/GamesList/Pagination';

export default function Wishlist () {
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState<GameModel[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [hasError, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getGames = useCallback(async () => {
    window.scrollTo({behavior: 'smooth', top: 0});
    const wishListItems = sessionStorage.getItem('wishlist');
    const parsedWishListItems = wishListItems ? JSON.parse(wishListItems) : '';
    if(!parsedWishListItems) {
      setIsLoading(false);
      setGames([]);
    }

    const gamesResponse = await getAllGames({ids: parsedWishListItems, page: currentPage});
    if(gamesResponse.status) {
      setGames([]);
      setError(true);
      setIsLoading(false);
      return;
    }

    if(gamesResponse) {
      setGames(gamesResponse);
      setIsLoading(false);
      const count = await getTotalPages({ids: parsedWishListItems, page: currentPage});
      setTotalPages(count.count/maxPerPage);
    }
  }, [currentPage]);

  useEffect(() => {
    getGames();
  }, [getGames]);

  const showPagination = totalPages > 1;

  return (
    <div className="store-container">
    <GamesList 
      games={games}
      hasError={hasError}
      isEmptyResponse={!hasError && !games.length && !isLoading}
      isLoading={isLoading}
      title='My Wishlist'
    />
    
    {setCurrentPage && showPagination && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}/>}
    </div>
  )
}
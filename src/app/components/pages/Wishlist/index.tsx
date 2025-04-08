import { useCallback, useEffect, useState } from 'react';
import './wishlist.scss';
import GamesList from 'app/components/shared/GamesList';
import { GameModel } from 'app/models/gameModel';
import { getAllGames, getTotalPages, maxPerPage } from 'app/services/gamesSearch';
import Pagination from 'app/components/shared/GamesList/Pagination';
import ErrorMessage from 'app/components/shared/ErrorMessage';
import { Link } from 'react-router-dom';

export default function Wishlist () {
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState<GameModel[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [hasError, setError] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getGames = useCallback(async () => {
    window.scrollTo({behavior: 'smooth', top: 0});
    const wishListItems = sessionStorage.getItem('wishlist');
    const parsedWishListItems = wishListItems ? JSON.parse(wishListItems) : '';
    if(!parsedWishListItems || !parsedWishListItems.length) {
      setEmpty(true);
      setIsLoading(false);
      setGames([]);
      return;
    }
    setEmpty(false);

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
      isEmptyResponse={!hasError && !games.length && !isLoading && !empty}
      isLoading={isLoading}
      title='My Wishlist'
    />
    {empty && 
      <div className='d-flex justify-content-center wrap'>
        <ErrorMessage message='Your wishlist looks empty, you can add games here by clicking on the heart icon on them!' />
        <Link className='store-link' to='/list'>Search some games!</Link>
      </div>
    }
    {setCurrentPage && showPagination && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}/>}
    </div>
  )
}
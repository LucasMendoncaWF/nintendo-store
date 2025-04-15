import { useState } from 'react';
import GamesList from 'app/components/shared/GamesList';
import ErrorMessage from 'app/components/shared/ErrorMessage';
import { Link } from 'react-router-dom';
import { useGetGamesById, useGetTotalPages } from 'app/services/gamesSearch';
import { useWishlistStore } from 'app/stores/wishlistStore';
import Pagination from 'app/components/shared/GamesList/Pagination';
import './wishlist.scss';

export default function Wishlist () {
  const [currentPage, setCurrentPage] = useState(1);
  const {wishlistItems} = useWishlistStore();

  //Would get the games from a database table linked with the user if I could use a database on netlify
  const {
    data:games,
    isError,
    isLoading
  } = useGetGamesById({ids: wishlistItems, page: currentPage});

  const {
    data:totalPages,
  } = useGetTotalPages({ids: wishlistItems, page: currentPage});

  const isEmpty = !wishlistItems.length;
  return (
    <div className="store-container">
    <GamesList 
      games={games}
      hasError={isError}
      isEmptyResponse={!isError && !games?.length && !isLoading && !isEmpty}
      isLoading={isLoading}
      title='My Wishlist'
      hasAutoScroll
    />
    {isEmpty && 
      <div className='d-flex justify-content-center wrap'>
        <ErrorMessage message='Your wishlist looks empty, you can add games here by clicking on the heart icon on them!' />
        <Link className='store-link' to='/list'>Search some games!</Link>
      </div>
    }
    <Pagination gamesLength={games?.length} totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}/>
    </div>
  )
}
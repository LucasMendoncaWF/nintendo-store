import { useRef, useState } from 'react';
import './wishlist.scss';
import GamesList from 'app/components/shared/GamesList';
import Pagination from 'app/components/shared/GamesList/Pagination';
import ErrorMessage from 'app/components/shared/ErrorMessage';
import { Link } from 'react-router-dom';
import { useGetAllWishListGames, useGetTotalPages } from 'app/services/gamesSearch';

export default function Wishlist () {
  const [currentPage, setCurrentPage] = useState(1);
  const wishListItems = sessionStorage.getItem('wishlist');
  const parsedWishListItems = wishListItems ? JSON.parse(wishListItems) : '';
  const empty = useRef(false);
  if(!parsedWishListItems || !parsedWishListItems.length) {
    empty.current = true;
  }

  const {
    data:games,
    isError,
    isLoading
  } = useGetAllWishListGames({ids: parsedWishListItems, page: currentPage});

  const {
    data:totalPages,
  } = useGetTotalPages({ids: parsedWishListItems, page: currentPage});

  const showPagination = totalPages && totalPages > 1 && games?.length;
  return (
    <div className="store-container">
    <GamesList 
      games={games}
      hasError={isError}
      isEmptyResponse={!isError && !games?.length && !isLoading && !empty.current}
      isLoading={isLoading}
      title='My Wishlist'
    />
    {empty.current && 
      <div className='d-flex justify-content-center wrap'>
        <ErrorMessage message='Your wishlist looks empty, you can add games here by clicking on the heart icon on them!' />
        <Link className='store-link' to='/list'>Search some games!</Link>
      </div>
    }
    {setCurrentPage && showPagination && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}/>}
    </div>
  )
}
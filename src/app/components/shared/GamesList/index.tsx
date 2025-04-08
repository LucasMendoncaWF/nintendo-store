import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader";
import GameItem from "./GameItem";
import './gamesList.scss';
import Pagination from "./Pagination";
import { GameModel } from "app/models/gameModel";
import { getAllGames, getRecentGamesList, getTotalPages } from "app/services/gamesSearch";
import ErrorMessage from "../ErrorMessage";
interface Props {
  type: 'recent' | 'similar' | 'all' | 'wishlist';
  searchTerm?: string;
  setCurrentPage?: (page: number) => void;
  currentPage?: number;
}

export default function GamesList ({type, searchTerm, setCurrentPage, currentPage}: Props) {
  const renderPage = currentPage || 1;
  const [games, setGames] = useState<GameModel[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [hasError, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [inWishlist, setInWishlist] = useState<number[]>([]);
  const [inCart, setInCart] = useState<number[]>([]);
  const titles = {
    recent: 'Recent Games',
    similar: 'Similar Games',
    all: 'All Games',
    wishlist: 'Wishlist',
  }

  
  const onAddToWishlist = (e: React.MouseEvent, gameId: number) => {
    e.stopPropagation();
    e.preventDefault();
    
    let newWishlist = [];
    if(inWishlist.includes(gameId)) {
      newWishlist = inWishlist.filter((id: number) => id !== gameId);
      sessionStorage.setItem('wishlist', JSON.stringify(newWishlist));
    } else {
      newWishlist = [...inWishlist, gameId];
      sessionStorage.setItem('wishlist', JSON.stringify(newWishlist));
    }
    setInWishlist(newWishlist);
  }

  const onAddToCart = (e: React.MouseEvent, gameId: number) => {
    e.stopPropagation();
    e.preventDefault();
    let newCart = [];
    if(inCart.includes(gameId)) {
      newCart = inCart.filter((id: number) => id !== gameId);
      sessionStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      newCart = [...inCart, gameId];
      sessionStorage.setItem('cart', JSON.stringify(newCart));
    }
    setInCart(newCart)
  }

  const getGames = useCallback(async () => {
    const functions = {
      recent: () => getRecentGamesList(),
      similar: () => getRecentGamesList(),
      all: () => getAllGames({searchTerm, page: renderPage}),
      wishlist: () => getAllGames({searchTerm, page: renderPage, ids: JSON.parse(sessionStorage.getItem('wishlist') || '')}),
    }

    const gamesResponse = await functions[type]();
    if(gamesResponse.status) {
      setGames([]);
      setError(true);
      setIsLoading(false);
      return;
    }

    if(gamesResponse) {
      setGames(gamesResponse);
      setIsLoading(false);
      const count = await getTotalPages({searchTerm, page: 1});
      setTotalPages(count.count/28);
    }
  }, [renderPage, searchTerm, type]);

  useEffect(() => {
    const wishlist = sessionStorage.getItem('wishlist');
    const currentWishList = wishlist ? JSON.parse(wishlist) : null;
    if(currentWishList) {
      setInWishlist(currentWishList);
    }


    const cart = sessionStorage.getItem('cart');
    const currentCart = cart ? JSON.parse(cart) : null;
    if(currentCart) {
      setInCart(currentCart);
    }
  }, [games.length, getGames]);

  useEffect(() => {
    getGames();
    if(type === 'all') {
      window.scrollTo({behavior: 'smooth', top: 0});
    }
  }, [currentPage, getGames, type]);
  

  const hasPagination = type !== 'recent' && type !== 'similar';
  const isEmptyResponse = !isLoading && !hasError && games.length === 0;
  const showPagination = hasPagination && !isLoading && !hasError && totalPages > 1 && games.length !== 0;
  return (
    <div>
      <div className='d-flex wrap games-list justify-content-center'> 
        <h2 className="games-list__title d-flex space-between wrap align-center">
          {titles[type]}
        </h2>
        
        {!isLoading && games?.map((game, index) => (
          <GameItem 
            onAddToCart={onAddToCart} 
            onAddToWishList={onAddToWishlist} 
            isOnWishList={inWishlist.includes(game.id)} 
            isOnCart={inCart.includes(game.id)} 
            game={game} 
            key={`${index}_${game.id} `}
          />
        ))}
      </div>

      <div className="d-flex justify-content-center">
        {isLoading && <Loader />}
        {hasError && <ErrorMessage message={'An error occurred while trying to get the latest games.'}/>}
        {isEmptyResponse && <ErrorMessage message={'No games with that filters were found.'}/>}
      </div>

      {setCurrentPage && showPagination && <Pagination totalPages={totalPages} currentPage={renderPage} onPageChange={(page) => setCurrentPage(page)}/>}
    </div>
  )
}
import {useState } from "react";
import Loader from "../Loader";
import GameItem from "./GameItem";
import './gamesList.scss';
import { GameModel } from "app/models/gameModel";
import ErrorMessage from "../ErrorMessage";
interface Props {
  title: string;
  games?: GameModel[];
  isLoading: boolean;
  hasError: boolean;
  isEmptyResponse: boolean;
}

export default function GamesList ({
  title, 
  games,
  isLoading,
  hasError,
  isEmptyResponse,
}: Props) {
  const sessionWishList = sessionStorage.getItem('wishlist');
  const parsedWishList = sessionWishList? JSON.parse(sessionWishList) : [];
  const [inWishlist, setInWishlist] = useState<number[]>(parsedWishList);
  const sessionCart = sessionStorage.getItem('cart');
  const parsedCart = sessionCart? JSON.parse(sessionCart) : [];
  const [inCart, setInCart] = useState<number[]>(parsedCart);
  
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
    setInCart(newCart);
  }
  
  return (
    <div>
      <div className='d-flex wrap games-list justify-content-center'> 
        {title && 
          <h2 className="games-list__title d-flex space-between wrap align-center">
            {title}
          </h2>
        }
        
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

    </div>
  )
}
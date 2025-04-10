import GamesList from "app/components/shared/GamesList";
import { useFetchGame, useGetRecentGamesList } from "app/services/gamesSearch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import heart from 'assets/images/heart.png';
import heartFilled from 'assets/images/heart_filled.png';
import './gameDetails.scss'
import GameTag from "app/components/shared/GameTag";
import Loader from "app/components/shared/Loader";
import ErrorMessage from "app/components/shared/ErrorMessage";
import { useCartStore } from "app/stores/cartStore";
import { useWishlistStore } from "app/stores/wishlistStore";
import noImage from 'assets/images/no-image.jpg';

export default function GameDetails () {
  const params = useParams();
  const {onClickCart, cartItems} = useCartStore();
  const {onClickWishlist, wishlistItems} = useWishlistStore();
  const [heartIcon, setHeartIcon] = useState(heart);

  const {
    data: game,
    isError,
    isFetching,
  } = useFetchGame(params.id || '');

  const {
    data: gamesList,
    isError: isListError,
    isFetching: isListLoading
  } = useGetRecentGamesList();

  const onAddToWishlist = (e: React.MouseEvent, gameId: number) => {
    e.stopPropagation();
    e.preventDefault();
    onClickWishlist(gameId);
  }

  const onAddToCart = (e: React.MouseEvent, gameId: number) => {
    e.stopPropagation();
    e.preventDefault();
    onClickCart(gameId);
  }

  useEffect(() => {
    window.scrollTo({behavior: 'smooth', top: 0});
  }, [game?.id])

  useEffect(() => {
    setHeartIcon(game?.id && wishlistItems.includes(game?.id) ? heartFilled : heart);
  }, [wishlistItems, game?.id]);

  const releaseDate = game && new Date(game?.first_release_date * 1000);
  const imageUrl =  game?.artworks ? game?.artworks[0]?.url.replace('t_thumb', 't_1080p') : noImage;
  const isInCart = game && cartItems.includes(game?.id);
  const formattedDate = releaseDate?.toLocaleDateString();
  return (
    <div className="game-detail">
    <div>
      {isFetching ?
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
        :
        <div className="game-detail__banner">
          <img  className="game-detail__image" src={imageUrl} alt="game banner"/>
          <div className="game-detail__info">
            {isError ? 
            <ErrorMessage message="An error occurred while getting the game details" />
              :
              <>
                <p className="game-detail__date">{formattedDate}</p>
                <h3 className="game-detail__name" title={game?.name}>{game?.name}</h3>
                <div className="d-flex wrap game-detail__tags">
                  {game?.genres?.map(genre => 
                    <GameTag key={genre.id} tagName={genre.name}/>
                  )}
                </div>
                <div className="game-detail__summary">{game?.summary}</div>
                <p className="game-detail__price">${game?.price}</p>
                <div className="d-flex space-between">
                  <button 
                  onClick={(e) => {
                    game && onAddToCart(e, game?.id)
                  }}
                    className={`game-detail__add-cart ${isInCart ? 'on-cart' : ''}`}
                  >
                    {!isInCart ? 'Add to cart' : 'On cart'}
                  </button>
                  <button className="game-detail__add-wishlist"onClick={(e) => game && onAddToWishlist(e, game.id)}>
                    <img className="game-detail__heart" alt="add to wishlist button" src={heartIcon} />
                  </button>
                </div>
              </>
            }
          </div>
        </div>
      }
      
    </div>
    <GamesList 
      games={gamesList?.filter(currGame => currGame.id !== game?.id)}
      hasError={isListError}
      isEmptyResponse={!isListError && !gamesList?.length && !isListLoading}
      isLoading={isListLoading}
      title='Similar Games'
    />
    </div>
  )
}
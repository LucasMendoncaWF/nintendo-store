import GamesList from "app/components/shared/GamesList";
import { useFetchGame, useGetGamesById, useGetRecentGamesList } from "app/services/gamesSearch";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import heart from 'assets/images/heart.png';
import heartFilled from 'assets/images/heart_filled.png';
import GameTag from "app/components/shared/GameTag";
import Loader from "app/components/shared/Loader";
import ErrorMessage from "app/components/shared/ErrorMessage";
import { useCartStore } from "app/stores/cartStore";
import { useWishlistStore } from "app/stores/wishlistStore";
import noImage from 'assets/images/no-image.jpg';
import { maxInCart } from "app/constants/constants";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './gameDetails.scss'

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
  } = useGetGamesById({ids: game?.similar_games, page: 1});

  const {
    data:recentGamesList,
    isError: isRecentListError,
    isFetching: isRecentListLoading
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
  const isinCart = game && cartItems.includes(game?.id);
  const formattedDate = releaseDate?.toLocaleDateString();
  const canAddToCart = cartItems.length < maxInCart || isinCart;
  const isSimilarEmpty = !isListError && !gamesList?.length && !isListLoading;
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
                <p className="game-detail__price">${game?.price}</p>
                <div className="d-flex space-between">
                  <button 
                  disabled={!canAddToCart}
                  onClick={(e) => {
                    if(!canAddToCart) {
                      return;
                    }
                    game && onAddToCart(e, game?.id)
                  }}
                    className={`game-detail__add-cart ${isinCart ? 'on-cart' : ''}`}
                  >
                    {!isinCart ? 'Add to cart' : 'In cart'}
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

    {!isFetching && 
      <div className="game-detail__details d-flex justify-content-center wrap">
        <Carousel autoPlay infiniteLoop interval={3000}>
        {game?.screenshots?.map(image => 
            <div key={image.id} ><img src={image.url.replace('t_thumb', 't_1080p')} alt="game screenshot"/></div>
          )}
        </Carousel>
        <div className="game-detail__summary">
          <div>{game?.summary}</div>
          {game?.expanded_games?.length  && 
            <div className="game-detail__dlcs">
              <div className="game-detail__dlcs__title">Expansions</div>
              {game?.expanded_games?.map(expansionGame => 
                <Link key={expansionGame.id} className="game-detail__dlc" to={`/game/${expansionGame.id}`}><li>{expansionGame.name}</li></Link>
              )}
            </div>
          }
        </div>
      </div>
    }
      
    </div>
    {(!isSimilarEmpty && !isFetching && !isListLoading) ?
      <GamesList 
        games={gamesList?.filter(currGame => currGame.id !== game?.id)}
        hasError={isListError}
        isLoading={isListLoading || isFetching}
        title='Similar Games'
      />
      : 
      <GamesList 
        games={recentGamesList?.filter(currGame => currGame.id !== game?.id)}
        hasError={isRecentListError}
        isEmptyResponse={!isRecentListError && !isRecentListLoading && !recentGamesList?.length && !isListLoading}
        isLoading={isRecentListLoading || isFetching}
        title='Similar Games'
      />
    }
    </div>
  )
}
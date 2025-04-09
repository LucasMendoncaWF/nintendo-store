import GamesList from "app/components/shared/GamesList";
import { GameModel } from "app/models/gameModel";
import { fetchGame, getRecentGamesList } from "app/services/gamesSearch";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import heart from 'assets/images/heart.png';
import heartFilled from 'assets/images/heart_filled.png';
import './gameDetails.scss'
import GameTag from "app/components/shared/GameTag";
import Loader from "app/components/shared/Loader";
import ErrorMessage from "app/components/shared/ErrorMessage";

export default function GameDetails () {
  const params = useParams();
  const [gamesList, setGamesList] = useState<GameModel[]>([]);
  const [game, setGame] = useState<GameModel>({} as GameModel);
  const [hasError, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  
  const [hasErrorList, setErrorList] = useState<boolean>(false);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);

  const [inWishlist, setInWishlist] = useState<number[]>([]);
  const [inCart, setInCart] = useState<number[]>([]);

  const [heartIcon, setHeartIcon] = useState(heart);

  const getGame = useCallback(async () => {
    if(!params.id) {
      setGame({} as GameModel);
      setIsLoading(false);
      return;
    }
    const gamesResponse = await fetchGame({ids: [Number(params.id)], page: 1});
    if(gamesResponse.status) {
      setGame({} as GameModel);
      setError(true);
      setIsLoading(false);
      return;
    }

    if(gamesResponse) {
      setGame(gamesResponse[0]);
      setIsLoading(false);
    }
  }, [params.id]);

  const getSimilarGames = useCallback(async () => {
    const gamesResponse = await getRecentGamesList();
    setIsLoadingList(false);
    if(gamesResponse.status) {
      setGamesList([]);
      setErrorList(true);
      return;
    }

    if(gamesResponse) {
      setGamesList(gamesResponse);
      setErrorList(false);
    }
  }, []);

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
    setHeartIcon(newWishlist.includes(game.id) ? heartFilled : heart);
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

  useEffect(() => {
    getGame();
    getSimilarGames();

    const sessionWishList = sessionStorage.getItem('wishlist');
    const parsedWishList = sessionWishList? JSON.parse(sessionWishList) : [];
    setInWishlist(parsedWishList);
    setHeartIcon(parsedWishList.includes(game.id) ? heartFilled : heart);

    const sessionCart = sessionStorage.getItem('cart');
    const parsedCart = sessionCart? JSON.parse(sessionCart) : [];
    setInCart(parsedCart);

    window.scrollTo({behavior: 'smooth', top: 0})
  }, [getGame, getSimilarGames, game.id]);

  const releaseDate = new Date(game.first_release_date * 1000);
  const imageUrl =  game.cover?.url ? game.cover.url.replace('t_thumb', 't_1080p') : '';
  const isInCart = inCart.includes(game.id);
  const formattedDate = releaseDate.toLocaleDateString();
  return (
    <div className="game-detail">
    <div>
      <div className="game-detail__banner" style={{backgroundImage: `url(${imageUrl})`}}>
        <div className="game-detail__info">
          {hasError ? 
          <ErrorMessage message="An error occurred while getting the game details" />
          :
          isLoading ?
            <Loader /> 
            :
            <>
              <p className="game-detail__date">{formattedDate}</p>
              <div className="d-flex wrap game-detail__tags">
                {game.genres?.map(genre => 
                  <GameTag key={genre.id} tagName={genre.name}/>
                )}
              </div>
              <h3 className="game-detail__name" title={game.name}>{game.name}</h3>
              <div className="game-detail__summary">{game.summary}</div>
              <p className="game-detail__price">${game.price}</p>
              <div className="d-flex space-between">
                <button 
                onClick={(e) => {
                  onAddToCart(e, game.id)
                }}
                  className={`game-detail__add-cart ${isInCart ? 'on-cart' : ''}`}
                >
                  {!isInCart ? 'Add to cart' : 'On cart'}
                </button>
                <button className="game-detail__add-wishlist"onClick={(e) => onAddToWishlist(e, game.id)}>
                  <img className="game-detail__heart" alt="add to wishlist button" src={heartIcon} />
                </button>
              </div>
            </>
          }
        </div>
      </div>
      
    </div>
    <GamesList 
      games={gamesList.filter(currGame => currGame.id !== game.id)}
      hasError={hasErrorList}
      isEmptyResponse={!hasErrorList && !gamesList.length && !isLoadingList}
      isLoading={isLoadingList}
      title='Similar Games'
    />
    </div>
  )
}
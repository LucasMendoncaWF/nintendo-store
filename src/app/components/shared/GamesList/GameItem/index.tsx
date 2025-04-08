import { GameModel } from 'app/models/gameModel';
import heart from 'assets/images/heart.png';
import heartFilled from 'assets/images/heart_filled.png';
import noImage from 'assets/images/no-image.jpg';
import './gameItem.scss';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface Props {
  game: GameModel;
  onAddToCart: (e: React.MouseEvent, gameId: number) => void;
  onAddToWishList: (e: React.MouseEvent, gameId: number) => void;
  isOnWishList: boolean;
  isOnCart: boolean;
}

export default function GameItem ({
  game,
  onAddToCart,
  onAddToWishList,
  isOnCart,
  isOnWishList,
}: Props) {
  const [heartIcon, setHeartIcon] = useState(heart);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setHeartIcon(isOnWishList ? heartFilled : heart);
  }, [isOnWishList]);


  const releaseDate = new Date(game.first_release_date * 1000);
  const imageUrl =  game.cover?.url ? game.cover.url.replace('t_thumb', 't_720p') : noImage;
  const formattedDate = releaseDate.toLocaleDateString();
  return (
    <div className="game-item">
      <Link to={`/game/${game.id}`}>
      <div className={`game-item__container ${addedToCart ? 'added' : ''}`}>
        <div className="game-item__image" style={{backgroundImage: `url(${imageUrl})`}}> </div>
        <div className="game-item__info">
          <p className="game-item__date">{formattedDate}</p>
          <h3>{game.name}</h3>
          <p className="game-item__price">${game.price}</p>
          <div className="d-flex space-between">
            <button 
            onClick={(e) => {
              onAddToCart(e, game.id)
              setAddedToCart(!isOnCart);
            }}
              className={`game-item__add-cart ${isOnCart ? 'on-cart' : ''}`}
            >
              {!isOnCart ? 'Add to cart' : 'On cart'}
            </button>
            <button className="game-item__add-wishlist"onClick={(e) => onAddToWishList(e, game.id)}>
              <img className="game-item__heart" alt="add to wishlist button" src={heartIcon} />
            </button>
          </div>
        </div>
      </div>
      </Link>
      <div className={`game-item__box ${addedToCart ? 'added' : ''}`}>
        <div className="game-item__line-left"></div>
        <div className="game-item__line-right"></div>
        <div className="game-item__line-middle"></div>
      </div>
    </div>
  )
}
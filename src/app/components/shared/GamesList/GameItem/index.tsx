import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { maxInCart } from 'app/constants/constants';
import { GameModel } from 'app/models/gameModel';
import { useCartStore } from 'app/stores/cartStore';
import { useWishlistStore } from 'app/stores/wishlistStore';
import heart from 'assets/images/heart.png';
import heartFilled from 'assets/images/heart_filled.png';
import noImage from 'assets/images/no-image.jpg';

import './gameItem.scss';

interface Props {
  game: GameModel;
}

export default function GameItem({ game }: Props) {
  // Would use a table to sava the cart and wishlist if this project was connected to a database
  const { onClickCart, cartItems } = useCartStore();
  const { onClickWishlist, wishlistItems } = useWishlistStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [heartIcon, setHeartIcon] = useState(heart);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setHeartIcon(wishlistItems.includes(game.id) ? heartFilled : heart);
  }, [wishlistItems, game.id]);

  const onAddToCart = (e: React.MouseEvent, gameId: number) => {
    e.stopPropagation();
    e.preventDefault();
    onClickCart(gameId);
  };

  const onAddToWishList = (e: React.MouseEvent, gameId: number) => {
    e.stopPropagation();
    e.preventDefault();
    onClickWishlist(gameId);
  };

  const isinCart = cartItems.includes(game.id);
  const releaseDate = new Date(game.first_release_date * 1000);
  const imageUrl = game.artworks
    ? game.artworks[0]?.url?.replace('t_thumb', 't_720p')
    : noImage;
  const formattedDate = releaseDate.toLocaleDateString();
  const canAddToCart = cartItems.length < maxInCart || isinCart;
  return (
    <div className="game-item">
      <Link to={`/game/${game.id}`}>
        <div className={`game-item__container ${addedToCart ? 'added' : ''}`}>
          <div
            className="game-item__image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            {' '}
          </div>
          <div className="game-item__info">
            <p className="game-item__date">{formattedDate}</p>
            <h3>{game.name}</h3>
            <p className="game-item__price">${game.price}</p>
            <div className="d-flex space-between">
              <button
                ref={buttonRef}
                disabled={!canAddToCart}
                onClick={(e) => {
                  if (!canAddToCart) {
                    return;
                  }
                  onAddToCart(e, game.id);
                  buttonRef.current?.blur();
                  setAddedToCart(!isinCart);
                }}
                className={`game-item__add-cart ${isinCart ? 'on-cart' : ''}`}
              >
                {!isinCart ? 'Add to cart' : 'In cart'}
              </button>
              <button
                className="game-item__add-wishlist"
                onClick={(e) => onAddToWishList(e, game.id)}
              >
                <img
                  className="game-item__heart"
                  alt="add to wishlist button"
                  src={heartIcon}
                />
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
  );
}

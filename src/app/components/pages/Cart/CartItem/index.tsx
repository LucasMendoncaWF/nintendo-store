import { GameModel } from "app/models/gameModel";
import noImage from 'assets/images/no-image.jpg';
import GameTag from "app/components/shared/GameTag";
import trashIcon from "assets/images/trash.png";
import './cartItem.scss';
import { useCartStore } from "app/stores/cartStore";

export default function CartItem ({game}: {game: GameModel}) {
  const { onClickCart } = useCartStore();
  const imageUrl =  game?.artworks ? game?.artworks[0]?.url.replace('t_thumb', 't_1080p') : noImage;
  return (
    <div className="cart-item d-flex align-center">
      <button className="cart-item__remove" onClick={() => onClickCart(game.id)}><img src={trashIcon} alt="remove from cart"/></button>
      <div className="cart-item__banner"><img src={imageUrl} alt="game banner" /></div>
      <div className="cart-item__info">
        <div className="cart-item__title">{game.name}</div>
        <div className="d-flex wrap cart-item__tags">
          {game?.genres?.map(genre => 
            <GameTag key={genre.id} tagName={genre.name}/>
          )}
        </div>
      </div>
      <div className="cart-item__price">
        ${game.price.toFixed(2)}
      </div>
    </div>
  )
}
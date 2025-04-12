import { Link, useLocation } from "react-router-dom";
import CartIcon from 'assets/images/cart.png';
import { useCartStore } from "app/stores/cartStore";
import './cartFloat.scss';

export default function CartFloat () {
  const {cartItems} = useCartStore();
  const location = useLocation();
  const count = cartItems.length;
  const hideOnPages = ['cart', 'payment', 'user', 'online-game'];
 
  if(!cartItems.length || hideOnPages.some(page => location.pathname.includes(page))) {
    return null;
  }
  return (
    <Link to="/cart" className="cart-float">
      <img className="cart-float__icon" src={CartIcon} alt="cart icon"/>
      <div className="cart-float__count">{count}</div>
    </Link>
  );
}
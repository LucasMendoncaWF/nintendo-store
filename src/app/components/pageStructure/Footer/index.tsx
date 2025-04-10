import { Link } from 'react-router-dom';
import './footer.scss';
import { useUserStore } from 'app/stores/userStore';
export default function Footer() {
  const {toggleLoginModal, isLoggedIn} = useUserStore();
  return (
    <div className="footer">
      <div className='footer__title'>Website created by Lucas Mendonca</div>
      <div className='footer__links d-flex'>
        <div>
          <div className='footer__text'>Quick Links</div>
          <Link to='/list'><div className="footer__link">Store</div></Link>
          <Link to='#' className='link-disabled'><div className="footer__link">Support</div></Link>
          <Link to='/coins'><div className="footer__link">Coins</div></Link>
        </div>

        <div>
          <div className='footer__text'>User</div>
          {isLoggedIn && <Link to='/wishlist'><div className="footer__link">Wishlist</div></Link>}
          <Link to='#' className='link-disabled'><div className="footer__link">Cart</div></Link>
        </div>
      </div>
    </div>
  )
}
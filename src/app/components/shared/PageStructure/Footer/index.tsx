import { Link } from 'react-router-dom';
import './footer.scss';
export default function Footer() {
  return (
    <div className="footer">
      <div className='footer__title'>Website created by Lucas Mendonca</div>
      <div className='footer__links d-flex'>
        <div>
          <div className='footer__text'>Quick Links</div>
          <Link to='/list'><div className="footer__link">Store</div></Link>
          <Link to='/support'><div className="footer__link">Support</div></Link>
          <Link to='/coins'><div className="footer__link">Coins</div></Link>
        </div>
      </div>
    </div>
  )
}
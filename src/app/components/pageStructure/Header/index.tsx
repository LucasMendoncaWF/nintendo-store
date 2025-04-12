import logo from 'assets/images/logo.png';
import userIcon from 'assets/images/user_icon.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserStore } from 'app/stores/userStore';
import './header.scss';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const {toggleLoginModal, isLoggedIn, userData, logout} = useUserStore();

  const onClickLink = () => {
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
  }

  return (
    <header className="header d-flex space-between align-center" onMouseLeave={() =>  {
      setShowUserMenu(false);
      setIsMobileMenuOpen(false);
    }}>
      <div className="d-flex align-center">
        <Link to='/'><img className='header-logo' src={logo} alt="nintendo logo" /></Link>
        <div className='hide-mobile d-flex align-center header-links'>
        <Link to='/list'><div className="header-link">Store</div></Link>
        <Link to='/support'><div className="header-link">Support</div></Link>
        <Link to='/coins'><div className="header-link">Coins</div></Link>
        </div>
      </div>
      {!isLoggedIn ? 
        <Link to='#' onClick={() => toggleLoginModal(true)} className='hide-mobile'>
          <div className='sign-in d-flex align-center'>
          <img className='sign-in-icon' src={userIcon} alt="user icon to sign in" />
          <p>Sign In</p>
          </div>
        </Link>
      : 
        <Link to='#' onClick={() => setShowUserMenu(!showUserMenu)} className='hide-mobile'>
          <div className='sign-in d-flex align-center'>
          <img className='sign-in-icon' src={userIcon} alt="user icon to sign in" />
          <p>{userData?.name}</p>
          </div>
        </Link>
      }

      {showUserMenu && isLoggedIn && 
        <div className='hide-mobile logged-menu' >
          <Link onClick={onClickLink} to='/wishlist'><div className="logged-link">Wishlist</div></Link>
          <Link onClick={onClickLink}to='/configuration'><div className="logged-link">Configuration</div></Link>
          <Link to='#' onClick={() => {logout(); onClickLink();}}><div className="logged-link">Sign Out</div></Link>
        </div>
      }
      <div className='mobile-menu show-mobile'>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={'mobile-menu-icon' + (isMobileMenuOpen ? ' active' : '')}>
          <div className='menu-line'></div>
          <div className='menu-line'></div>
          <div className='menu-line'></div>
        </button>
        {isMobileMenuOpen && 
          <div className='mobile-links'>
            <Link onClick={onClickLink} to='/list'><div className="mobile-link">Store</div></Link>
            <Link onClick={onClickLink} to='/support'><div className="mobile-link">Support</div></Link> 
            <Link onClick={onClickLink} to='/coins'><div className="mobile-link">Coins</div></Link>
            {isLoggedIn && <Link onClick={onClickLink} to='/wishlist'><div className="mobile-link">Wishlist</div></Link>}
            {isLoggedIn && <Link onClick={onClickLink} to='/configuration'><div className="mobile-link">Configuration</div></Link>}
            {!isLoggedIn && 
              <Link to='#' onClick={() => {
                toggleLoginModal(true);
                setShowUserMenu(false);
                setIsMobileMenuOpen(false);
              }}>
                  <div className="mobile-link">Sign In</div>
              </Link>
            }
            {isLoggedIn && <Link to='#' onClick={() => {logout(); onClickLink();}}><div className="mobile-link">Sign Out</div></Link>}
          </div>
        }
      </div>
    </header>
  )
}
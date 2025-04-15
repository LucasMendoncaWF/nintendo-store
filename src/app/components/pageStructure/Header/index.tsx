import logo from 'assets/images/logo.png';
import userIcon from 'assets/images/user_icon.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserStore } from 'app/stores/userStore';
import './header.scss';
import MobileMenu from './MobileMenu';

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
        <button onClick={() => setShowUserMenu(!showUserMenu)} className='hide-mobile logged-in-button'>
          <div className='sign-in d-flex align-center'>
          <img className='sign-in-icon' src={userIcon} alt="user icon to sign in" />
          <p>{userData?.name}</p>
          </div>
        </button>
      }

      {showUserMenu && isLoggedIn && 
        <div className='hide-mobile logged-menu' >
          <Link onClick={onClickLink} to='/wishlist'><div className="logged-link">Wishlist</div></Link>
          <Link onClick={onClickLink} to='/me'><div className="logged-link">Configuration</div></Link>
          <Link onClick={onClickLink} to='/me/orders'><div className="logged-link">Orders</div></Link>
          <Link to='#' onClick={() => {logout(); onClickLink();}}><div className="logged-link">Sign Out</div></Link>
        </div>
      }
      
      <MobileMenu 
        isLoggedIn={isLoggedIn}
        isMobileMenuOpen={isMobileMenuOpen}
        logout={logout}
        onClickLink={onClickLink}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setShowUserMenu={setShowUserMenu}
        toggleLoginModal={toggleLoginModal}
      />
    </header>
  )
}
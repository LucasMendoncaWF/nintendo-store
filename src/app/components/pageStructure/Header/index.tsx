import logo from 'assets/images/logo.png';
import userIcon from 'assets/images/user_icon.png';
import './header.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header({setIsLoginOpen}: {setIsLoginOpen: (value: boolean) => void}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header d-flex space-between align-center">
      <div className="d-flex align-center">
        <Link to='/'><img className='header-logo' src={logo} alt="nintendo logo" /></Link>
        <div className='hide-mobile d-flex align-center header-links'>
        <Link to='/list'><div className="header-link">Store</div></Link>
        <Link to='#' className='link-disabled'><div className="header-link">Support</div></Link>
        <Link to='/coins'><div className="header-link">Coins</div></Link>
        </div>
      </div>
      <Link to='/' onClick={() => setIsLoginOpen(true)} className='hide-mobile'>
        <div className='sign-in d-flex align-center'>
        <img className='sign-in-icon' src={userIcon} alt="user icon to sign in" />
        <p>Sign In</p>
        </div>
      </Link>

      <div className='mobile-menu show-mobile' onMouseLeave={() => setIsMobileMenuOpen(false)}>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={'mobile-menu-icon' + (isMobileMenuOpen ? ' active' : '')}>
          <div className='menu-line'></div>
          <div className='menu-line'></div>
          <div className='menu-line'></div>
        </button>
        {isMobileMenuOpen && 
          <div className='mobile-links'>
            <Link to='/list'><div className="mobile-link">Store</div></Link>
            <Link to='#' className='link-disabled'><div className="mobile-link">Support</div></Link> 
            <Link to='/coins'><div className="mobile-link">Coins</div></Link>
            <Link to='#' onClick={() => setIsLoginOpen(true)}><div className="mobile-link">Sign In</div></Link>
          </div>
        }
      </div>
    </header>
  )
}
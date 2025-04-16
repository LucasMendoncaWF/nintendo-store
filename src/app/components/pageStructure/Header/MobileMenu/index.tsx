import { Link } from 'react-router-dom';

import './mobileMenu.scss';

interface Props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  toggleLoginModal: (value: boolean) => void;
  setShowUserMenu: (value: boolean) => void;
  onClickLink: () => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export default function MobileMenu({
  isMobileMenuOpen,
  isLoggedIn,
  setIsMobileMenuOpen,
  toggleLoginModal,
  setShowUserMenu,
  onClickLink,
  logout,
}: Props) {
  return (
    <div className="mobile-menu show-mobile">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={'mobile-menu-icon' + (isMobileMenuOpen ? ' active' : '')}
      >
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </button>
      {isMobileMenuOpen && (
        <div className="mobile-links">
          <Link onClick={onClickLink} to="/list">
            <div className="mobile-link">Store</div>
          </Link>
          <Link onClick={onClickLink} to="/support">
            <div className="mobile-link">Support</div>
          </Link>
          <Link onClick={onClickLink} to="/coins">
            <div className="mobile-link">Coins</div>
          </Link>
          {isLoggedIn && (
            <Link onClick={onClickLink} to="/wishlist">
              <div className="mobile-link">Wishlist</div>
            </Link>
          )}
          {isLoggedIn && (
            <Link onClick={onClickLink} to="/me">
              <div className="mobile-link">Configuration</div>
            </Link>
          )}
          {isLoggedIn && (
            <Link onClick={onClickLink} to="/me/orders">
              <div className="mobile-link">Orders</div>
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              to="#"
              onClick={() => {
                toggleLoginModal(true);
                setShowUserMenu(false);
                setIsMobileMenuOpen(false);
              }}
            >
              <div className="mobile-link">Sign In</div>
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="#"
              onClick={() => {
                logout();
                onClickLink();
              }}
            >
              <div className="mobile-link">Sign Out</div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

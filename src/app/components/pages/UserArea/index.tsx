import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

import { useUserStore } from 'app/stores/userStore';
import defaultAvatar from 'assets/images/mii.jpg';

import './userArea.scss';

export default function UserArea() {
  const location = useLocation();
  const { userData, isLoggedIn } = useUserStore();
  const currentPath = location.pathname?.split('me')[1];
  const isPersonalData = currentPath === '';

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="user-area">
      <div className="user-area__tab-links">
        <div className="user-area__avatar">
          <img src={userData?.avatar || defaultAvatar} alt="user avatar" />
        </div>
        <div className="user-area__user-name">
          {userData?.name} {userData?.lastName}
        </div>
        <div className=" hide-mobile">
          <Link to="/me">
            <div
              className={`user-area__tab-link ${isPersonalData && 'selected'}`}
            >
              Personal Data
            </div>
          </Link>
          <Link to="/me/orders">
            <div
              className={`user-area__tab-link ${currentPath === '/orders' && 'selected'}`}
            >
              Orders
            </div>
          </Link>
          <Link to="/me/family">
            <div
              className={`user-area__tab-link ${currentPath === '/family' && 'selected'}`}
            >
              Family Group
            </div>
          </Link>
          <Link to="#">
            <div className="user-area__tab-link">Lorem Ipsum</div>
          </Link>
        </div>
      </div>
      <div className="user-area__content-area">
        <Outlet />
      </div>
    </div>
  );
}

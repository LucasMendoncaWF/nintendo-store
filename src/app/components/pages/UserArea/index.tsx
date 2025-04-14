import { Link, Outlet, useLocation } from "react-router-dom";
import defaultAvatar from 'assets/images/mii.jpg';
import { useUserStore } from "app/stores/userStore";
import './userArea.scss';

export default function UserArea() {
  const location = useLocation();
  const currentPath = location.pathname?.split('me')[1];
  const {userData} = useUserStore();
  return (
    <div className="user-area">
      <div className="user-area__tab-links">
        <div className="user-area__avatar"><img src={userData?.avatar || defaultAvatar} alt="user avatar" /></div>
        <div className="user-area__user-name">{userData?.name}</div>
        <Link to='/me'><div className={`user-area__tab-link ${currentPath === '' && 'selected'}`}>User Configuration</div></Link>
        <Link to='/me/family'><div className={`user-area__tab-link ${currentPath === 'family' && 'selected'}`}>Family Group</div></Link>
        <Link to='/me/orders'><div className={`user-area__tab-link ${currentPath === 'orders' && 'selected'}`}>Family Group</div></Link>
        <Link to='#'><div className={`user-area__tab-link ${currentPath === '#' && 'selected'}`}>Lorem Ipsum</div></Link>
      </div>
      <div>
        <Outlet /> 
      </div>
    </div>
  )
}
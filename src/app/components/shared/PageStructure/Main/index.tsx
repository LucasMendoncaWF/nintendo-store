import { Route, Routes } from 'react-router-dom';
import './main.scss';
import Home from 'app/components/pages/Home';
import Store from 'app/components/pages/Store';
import Footer from '../Footer';
import Header from '../Header';
import Wishlist from 'app/components/pages/Wishlist';

export default function Main() {
  return (
    <>
      <Header />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/list" element={<Store />} />
          <Route path="/coins" element={<Store />} />
          <Route path="/support" element={<Store />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
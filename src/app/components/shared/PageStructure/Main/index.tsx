import { Route, Routes } from 'react-router-dom';
import './main.scss';
import Home from 'app/components/pages/Home';
import Store from 'app/components/pages/Store';
import Footer from '../Footer';
import Header from '../Header';
import Wishlist from 'app/components/pages/Wishlist';
import GameDetails from 'app/components/pages/GameDetails';

export default function Main() {
  return (
    <>
      <Header />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/list" element={<Store />} />
          <Route path="/coins" element={<div />} />
          <Route path="/support" element={<div />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
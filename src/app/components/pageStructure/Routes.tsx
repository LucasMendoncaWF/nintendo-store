import Coins from "../pages/Coins";
import GameDetails from "../pages/GameDetails";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import Store from "../pages/Store";
import Support from "../pages/Support";
import Wishlist from "../pages/Wishlist";
import { Route, Routes } from 'react-router-dom';

export default function RoutesComponent () {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/list" element={<Store />} />
      <Route path="/coins" element={<Coins />} />
      <Route path="/support" element={<Support />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/game/:id" element={<GameDetails />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
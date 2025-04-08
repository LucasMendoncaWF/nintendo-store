import Coins from "../pages/Coins";
import GameDetails from "../pages/GameDetails";
import Home from "../pages/Home";
import Store from "../pages/Store";
import Wishlist from "../pages/Wishlist";
import { Route, Routes } from 'react-router-dom';

export default function RoutesComponent () {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/list" element={<Store />} />
      <Route path="/coins" element={<Coins />} />
      <Route path="/support" element={<div />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/game/:id" element={<GameDetails />} />
    </Routes>
  )
}
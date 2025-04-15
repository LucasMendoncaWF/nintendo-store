import CartPage from "../pages/Cart";
import Coins from "../pages/Coins";
import GameDetails from "../pages/GameDetails";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PaymentPage from "../pages/Payment";
import Product from "../pages/Product";
import Store from "../pages/Store";
import Support from "../pages/Support";
import UserArea from "../pages/UserArea";
import FamilyGroup from "../pages/UserArea/FamilyGroup";
import Orders from "../pages/UserArea/Orders";
import PersonalDataForm from "../pages/UserArea/PersonalData";
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
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path='/me' element={<UserArea />}>
        <Route index element={<PersonalDataForm />} />
        <Route path='/me/orders' element={<Orders />} />
        <Route path='/me/family' element={<FamilyGroup />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
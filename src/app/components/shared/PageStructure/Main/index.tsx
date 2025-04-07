import { Route, Routes } from 'react-router-dom';
import './main.scss';
import Home from 'app/components/pages/Home';
import Store from 'app/components/pages/Store';
import Footer from '../Footer';
import Header from '../Header';

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
        </Routes>
      </div>
      <Footer />
    </>
  )
}
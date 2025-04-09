import './main.scss';
import Footer from '../Footer';
import Header from '../Header';
import RoutesComponent from '../Routes';
import { useState } from 'react';
import LoginForm from '../LoginForm';

export default function Main() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  return (
    <>
      <LoginForm setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen}/>
      <Header setIsLoginOpen={setIsLoginOpen}/>
      <div className='main'>
        <RoutesComponent />
      </div>
      <Footer />
    </>
    
  )
}
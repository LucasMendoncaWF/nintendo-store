import './main.scss';
import Footer from '../Footer';
import Header from '../Header';
import RoutesComponent from '../Routes';
import LoginForm from '../LoginForm';
import CartFloat from '../CartFloat';

export default function Main() {
  
  return (
    <>
      <LoginForm />
      <Header/>
      <CartFloat />
      <div className='main'>
        <RoutesComponent />
      </div>
      <Footer />
    </>
    
  )
}
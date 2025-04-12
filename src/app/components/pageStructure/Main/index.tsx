import Footer from '../Footer';
import Header from '../Header';
import RoutesComponent from '../Routes';
import LoginForm from '../LoginForm';
import CartFloat from '../CartFloat';
import './main.scss';

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
import './main.scss';
import Footer from '../Footer';
import Header from '../Header';
import RoutesComponent from '../Routes';
import LoginForm from '../LoginForm';

export default function Main() {
  
  return (
    <>
      <LoginForm />
      <Header/>
      <div className='main'>
        <RoutesComponent />
      </div>
      <Footer />
    </>
    
  )
}
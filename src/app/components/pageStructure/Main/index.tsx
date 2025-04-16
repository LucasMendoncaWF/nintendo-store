import CartFloat from '../CartFloat';
import Footer from '../Footer';
import Header from '../Header';
import LoginForm from '../LoginForm';
import RoutesComponent from '../Routes';

export default function Main() {
  return (
    <>
      <LoginForm />
      <Header />
      <CartFloat />
      <div className="main">
        <RoutesComponent />
      </div>
      <Footer />
    </>
  );
}

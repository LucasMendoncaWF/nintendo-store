import './main.scss';
import Footer from '../Footer';
import Header from '../Header';
import RoutesComponent from '../Routes';

export default function Main() {
  return (
    <>
      <Header />
      <div className='main'>
        <RoutesComponent />
      </div>
      <Footer />
    </>
  )
}
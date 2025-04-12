import Mario404 from 'assets/images/mario_404.png';
import './notFound.scss';

export default function NotFound () {
  return (
    <div className='page-404 d-flex'>
      <p className='page-404__text'>404 - Looks like you are trying to access a page that doesn't exist!</p>
      <img className='page-404__image' alt='Mario confused' src={Mario404} />
    </div>
  )
}
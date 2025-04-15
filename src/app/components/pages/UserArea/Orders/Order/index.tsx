import { OrderModel } from 'app/models/orderModel';
import './order.scss';
import { useState } from 'react';
import { useGetCartGames } from 'app/services/gamesSearch';
import { maxInCart } from 'app/constants/constants';
import Loader from 'app/components/shared/Loader';
import ErrorMessage from 'app/components/shared/ErrorMessage';
import noImage from 'assets/images/no-image.jpg'

interface Props {
  order: OrderModel;
}

export default function Order ({order}:Props) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data:games,
    isError,
    isLoading
  } = useGetCartGames({ids: order.products, pageLimit: maxInCart, page: 1});
  return (
    <div className='order'>
      <button className='order__title' onClick={() => setIsOpen(!isOpen)}>
        <div>Order #{order.id}</div>
        <i className={`order__arrow ${isOpen ? 'open' : ''}`} />
      </button>
      <div className={`order__content ${isOpen ? 'open' : ''}`}>
        {isLoading && 
          <div className='d-flex justify-content-center'>
            <Loader />
          </div>
        }
        {isError && 
          <ErrorMessage message='An error occurred while trying to load this order details' />
        }
        {games?.length && 
          <>
            {games.map(game => 
              <div className='d-flex order__content__item wrap' key={game.id}>
                <img className='order__content__game-poster' src={game.artworks[0]?.url?.replace('t_thumb', 't_720p') || noImage} alt='game poster' />
                <div className='order__content__game-details '>
                  <div className='order__content__game-name'>{game.name}</div>
                  <div className='order__content__game-price'>${game.price.toFixed(2)}</div>
                </div>
              </div>
            )}
            <div className='order__price d-flex space-between'>
              <div>Total: </div>
              <div>${order.price.toFixed(2)}</div>
            </div>
            <div className='order__buttons d-flex space-between'>
              <button title='No refunds here, ha ha' onClick={(e) => e.stopPropagation()} className='secondary-button'>refund</button>
            </div>
          </>
        }
      </div>
    </div>
  )
}
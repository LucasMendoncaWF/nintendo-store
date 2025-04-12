import { useGetGamesById } from 'app/services/gamesSearch';
import { useCartStore } from 'app/stores/cartStore';
import ErrorMessage from 'app/components/shared/ErrorMessage';
import { Link, Navigate } from 'react-router-dom';
import Loader from 'app/components/shared/Loader';
import { useUserStore } from 'app/stores/userStore';
import './payment.scss';
import { useState } from 'react';

type PaymentType = 'credit'|'debit'|'paypal'|'';

export default function PaymentPage () {
  const [itemOpen, setItemOpen] = useState<PaymentType>('');
  const {isLoggedIn} = useUserStore();
  const {cartItems} = useCartStore();

  if(!isLoggedIn) {
    <Navigate to='/' />
  }
  
  const {
    data:games,
    isError,
    isLoading
  } = useGetGamesById({ids: cartItems, page: 1, pageLimit: 50});

  let totalPrice = 0;
  games?.forEach(game => {
    totalPrice += Number(game.price);
  });

  const onClickItem = (paymentType: PaymentType) => {
    console.log(paymentType)
    setItemOpen(paymentType === itemOpen ? '' : paymentType);
  }

  const checkIsOpen = (paymentType: PaymentType) => {
    return paymentType === itemOpen;
  }

  return (
    <div className="payment-page">
      <h3 className='payment-page__title'>Payment</h3>
      <div className='d-flex justify-content-center'>
        <div className='payment-page__content'>
          {isLoading &&
            <div className='d-flex justify-content-center'>
              <Loader />
            </div>
          }
          {!games?.length && !isLoading && 
            <div className='d-flex justify-content-center wrap'>
              <ErrorMessage message='Your cart looks empty, you can add games here by clicking on the "Add to cart" button on them!' />
              <Link className='store-link' to='/list'>Search some games!</Link>
            </div>
          }
          {isError && 
            <div className='d-flex justify-content-center wrap'>
              <ErrorMessage message='An error occurred while trying to get the games of your cart, please try again later.' />
            </div>
          }

          <div className='payment-page__total d-flex space-between'>
            <div>Total</div>
            <div>${totalPrice.toFixed(2)}</div>
          </div>
          <div className={`payment-page__method ${checkIsOpen('credit') ? 'open' : ''}`}>
            <button onClick={() => onClickItem('credit')} className='payment-page__method__title d-flex space-between'>
              <div>Credit Card</div>
              <i className='payment-page__arrow'></i>
            </button>
            <div className='payment-page__method__content'>
              trest
            </div>
          </div>
          <div className={`payment-page__method ${checkIsOpen('debit') ? 'open' : ''}`}>
            <button onClick={() => onClickItem('debit')} className='payment-page__method__title d-flex space-between'>
              <div>Debit Card</div>
              <i className='payment-page__arrow'></i>
            </button>
            <div className='payment-page__method__content'>
              trest
            </div>
          </div>
          <div className={`payment-page__method ${checkIsOpen('paypal') ? 'open' : ''}`}>
            <button onClick={() => onClickItem('paypal')} className='payment-page__method__title d-flex space-between'>
              <div>Paypal</div>
              <i className='payment-page__arrow'></i>
            </button>
            <div className='payment-page__method__content'>
              trest
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
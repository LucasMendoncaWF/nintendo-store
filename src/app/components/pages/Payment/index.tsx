import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import ErrorMessage from 'app/components/shared/ErrorMessage';
import Loader from 'app/components/shared/Loader';
import { maxInCart } from 'app/constants/constants';
import { CardPaymentModel } from 'app/models/paymentModel';
import { useGetCartGames } from 'app/services/gamesSearch';
import { cardPay } from 'app/services/payment';
import { useCartStore } from 'app/stores/cartStore';
import { useUserStore } from 'app/stores/userStore';
import completedImage from 'assets/images/mario-completed.jpg';
import paypalLogo from 'assets/images/paypal.png';

import CardForm from './CardForm';
import './payment.scss';

import { useMutation } from '@tanstack/react-query';

type PaymentType = 'credit' | 'debit' | 'paypal' | '';

export default function PaymentPage() {
  const [itemOpen, setItemOpen] = useState<PaymentType>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const { isLoggedIn } = useUserStore();
  const { cartItems, emptyCart } = useCartStore();

  const {
    data: games,
    isError: isErrorGames,
    isLoading: isLoadingGames,
  } = useGetCartGames({ ids: cartItems, page: 1, pageLimit: maxInCart });

  const {
    mutate: payMutation,
    isError: isPaymentError,
    isPending: isPaymentPending,
    reset: resetPaymentMutation,
  } = useMutation({
    async mutationFn(data: CardPaymentModel) {
      if (!isLoggedIn) {
        return;
      }
      return await cardPay(data);
    },
    onSettled() {
      setTimeout(() => {
        resetPaymentMutation();
      }, 5000);
    },
    onSuccess() {
      emptyCart();
      setIsCompleted(true);
    },
  });

  let totalPrice = 0;
  games?.forEach((game) => {
    totalPrice += Number(game.price);
  });

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  const onClickItem = (paymentType: PaymentType) => {
    setItemOpen(paymentType === itemOpen ? '' : paymentType);
  };

  const checkIsOpen = (paymentType: PaymentType) => {
    return paymentType === itemOpen;
  };

  const onSubmitPayment = (data: CardPaymentModel, type: PaymentType) => {
    payMutation({ ...data, type });
  };

  if (isCompleted) {
    return (
      <div className="payment-page">
        <h3 className="payment-page__title">Payment</h3>
        <div className="d-flex justify-content-center">
          <div className="payment-page__content">
            <div className="payment-page__completed">Payment completed!</div>
            <div className="payment-page__completed payment-page__completed__subtitle">
              You can access your games on your console now!
            </div>
            <img
              className="payment-page__completed__image"
              src={completedImage}
              alt="payment completed"
            />
            <div className="payment-page__completed__link">
              <Link className="store-link" to="/">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cartIsEmpty = !games?.length && !isLoadingGames;
  const canShowForms = !isLoadingGames && !isErrorGames && !!games?.length;
  return (
    <div className="payment-page">
      <h3 className="payment-page__title">Payment</h3>
      <div className="d-flex justify-content-center">
        <div className="payment-page__content">
          {isLoadingGames && <Loader />}
          {cartIsEmpty && (
            <div className="d-flex justify-content-center wrap">
              <ErrorMessage message='Your cart looks empty, you can add games here by clicking on the "Add to cart" button on them!' />
              <Link className="store-link" to="/list">
                Search some games!
              </Link>
            </div>
          )}
          {isErrorGames && (
            <div className="d-flex justify-content-center wrap">
              <ErrorMessage message="An error occurred while trying to get the games of your cart, please try again later." />
            </div>
          )}
          {isPaymentError && (
            <div className="d-flex payment-page__error justify-content-center wrap">
              <ErrorMessage
                type="small-popup"
                message="An error occurred while trying to complete the payment, please try again."
              />
            </div>
          )}
          {isPaymentPending && (
            <div className="payment-page__pay-loading">
              <Loader />
            </div>
          )}

          {canShowForms && (
            <>
              <div className="payment-page__total d-flex space-between">
                <div>Total</div>
                <div>${totalPrice.toFixed(2)}</div>
              </div>
              <div
                className={`payment-page__method ${checkIsOpen('credit') ? 'open' : ''}`}
              >
                <button
                  onClick={() => onClickItem('credit')}
                  className="payment-page__method__title d-flex space-between"
                >
                  <div>Credit Card</div>
                  <i className="payment-page__arrow"></i>
                </button>
                <div className="payment-page__method__content">
                  <CardForm
                    onSubmit={(data) => onSubmitPayment(data, 'credit')}
                  />
                </div>
              </div>
              <div
                className={`payment-page__method ${checkIsOpen('debit') ? 'open' : ''}`}
              >
                <button
                  onClick={() => onClickItem('debit')}
                  className="payment-page__method__title d-flex space-between"
                >
                  <div>Debit Card</div>
                  <i className="payment-page__arrow"></i>
                </button>
                <div className="payment-page__method__content">
                  <CardForm
                    onSubmit={(data) => onSubmitPayment(data, 'debit')}
                  />
                </div>
              </div>
              <div
                className={`payment-page__method ${checkIsOpen('paypal') ? 'open' : ''}`}
              >
                <button
                  onClick={() => onClickItem('paypal')}
                  className="payment-page__method__title d-flex space-between"
                >
                  <div>Paypal</div>
                  <i className="payment-page__arrow"></i>
                </button>
                <div className="payment-page__method__content">
                  <div>
                    <p>
                      You will be redirected to a paypal window, where you can
                      finish your payment.
                    </p>
                    <button className="payment-page__paypal">
                      <img src={paypalLogo} alt="paypal logo" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

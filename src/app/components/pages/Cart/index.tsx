import { useGetGamesById, useGetTotalPages } from 'app/services/gamesSearch';
import './cart.scss';
import { useState } from 'react';
import { useCartStore } from 'app/stores/cartStore';
import ErrorMessage from 'app/components/shared/ErrorMessage';
import Pagination from 'app/components/shared/GamesList/Pagination';
import { Link } from 'react-router-dom';
import Loader from 'app/components/shared/Loader';
import CartItem from './CartItem';
import { useUserStore } from 'app/stores/userStore';

export default function CartPage () {
  const {isLoggedIn, toggleLoginModal} = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const {cartItems} = useCartStore();
  
  const {
    data:games,
    isError,
    isLoading
  } = useGetGamesById({ids: cartItems, page: currentPage});
  
  const {
    data:totalPages,
  } = useGetTotalPages({ids: cartItems, page: currentPage});

  let totalPrice = 0;
  games?.forEach(game => {
    totalPrice += Number(game.price);
  });
  const showPagination = totalPages && totalPages > 1 && games?.length;
  const showList = !isError && !isLoading && games?.length;
  return (
    <div className="cart-page">
      <h3 className='cart-page__title'>Cart</h3>
      <div className='d-flex justify-content-center'>
        <div className='cart-page__content'>
          {isLoading &&
            <div className='d-flex justify-content-center'>
              <Loader />
            </div>
          }
          {!games?.length && 
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
          {showList && <div className='cart-page__subtitle hide-mobile'>Games on your cart</div>}
          {showList && 
            <>
              <div className='cart-page__games-list'>
                {games?.map(game => <CartItem game={game}/>)}
                {showPagination && 
                  <div className='cart-page__pagination'>
                    {<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}/>}
                  </div>
                }
              </div>
              <div className='cart-page__total d-flex space-between'>
                <div>Total</div>
                <div>${totalPrice.toFixed(2)}</div>
              </div>
            
              <div className='cart-page__pay-button d-flex'>
                {isLoggedIn ? 
                  <button>Complete purchase</button>
                  : <button onClick={() => toggleLoginModal(true)}>Log In to purchase</button>
                }

              </div>
            </>
          }
        </div>

      </div>
      
    </div>
  )
}
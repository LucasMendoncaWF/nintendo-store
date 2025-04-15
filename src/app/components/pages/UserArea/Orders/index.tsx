import { useUserStore } from 'app/stores/userStore';
import './orders.scss';
import { useGetOrders } from 'app/services/orders';
import Loader from 'app/components/shared/Loader';
import ErrorMessage from 'app/components/shared/ErrorMessage';
import Order from './Order';

export default function Orders () {
  const {userData} = useUserStore();

  const {
    data: orders,
    isLoading,
    isError,
  } = useGetOrders(userData?.id);

  console.log(orders)
  return (
    <div className='orders-page'>
      {isLoading &&
        <div className='d-flex justify-content-center'>
          <Loader />
        </div>
      }
      {isError &&
        <div className='d-flex justify-content-center'>
          <ErrorMessage  message='An error occurred while trying to search for your orders'/>
        </div>
      }
      {
        orders?.map(order => 
          <Order key={order.id} order={order}/>
        )
      }
    </div>
  )
}
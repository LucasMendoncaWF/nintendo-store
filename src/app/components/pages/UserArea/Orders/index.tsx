import ErrorMessage from 'app/components/shared/ErrorMessage';
import Loader from 'app/components/shared/Loader';
import { useGetOrders } from 'app/services/orders';
import { useUserStore } from 'app/stores/userStore';

import Order from './Order';
import './orders.scss';

export default function Orders() {
  const { userData } = useUserStore();
  // Would add pagination in this component if the api answer had pages and not mocked content
  const { data: orders, isLoading, isError } = useGetOrders(userData?.id);

  return (
    <div className="orders-page">
      <div className="show-mobile orders-page__title">Your Orders</div>
      {isLoading && <Loader />}
      {isError && (
        <div className="d-flex justify-content-center">
          <ErrorMessage message="An error occurred while trying to search for your orders" />
        </div>
      )}
      {orders?.map((order) => <Order key={order.id} order={order} />)}
    </div>
  );
}

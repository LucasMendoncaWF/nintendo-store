import { OrderModel } from 'app/models/orderModel';
import './order.scss';

interface Props {
  order: OrderModel;
}

export default function Order ({order}:Props) {
  return (
    <div className='order'>
      <div className='order__title'>#{order.id}</div>
    </div>
  )
}
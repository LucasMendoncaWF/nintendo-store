import { OrderModel } from 'app/models/orderModel';

import api from './api';
import QueryKeys from './queryKeys';

import { useQuery } from '@tanstack/react-query';

export function useGetOrders(userId?: number) {
  return useQuery<OrderModel[]>({
    queryKey: [QueryKeys.orders],
    queryFn: () =>
      api
        .post('orders', { body: { userId } })
        .catch((error) => {
          return error.response.data;
        })
        .then((response) => {
          return response.data as OrderModel[];
        }),
    enabled: !!userId,
  });
}

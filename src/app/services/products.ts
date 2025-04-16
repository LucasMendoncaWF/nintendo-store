import { ProductModel } from 'app/models/productModel';

import api from './api';
import QueryKeys from './queryKeys';

import { useQuery } from '@tanstack/react-query';

export function useGetProduct(id: string) {
  return useQuery<ProductModel>({
    queryKey: [QueryKeys.product, id],
    queryFn: () =>
      api
        .get(`products/${id}`)
        .catch((error) => {
          return error.response.data;
        })
        .then((response) => {
          return response.data;
        }),
  });
}

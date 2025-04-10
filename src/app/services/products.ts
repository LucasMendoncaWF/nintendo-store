import { useQuery } from "@tanstack/react-query";
import { Product } from "app/models/productModel";
import QueryKeys from "./queryKeys";
import api from "./api";

export function useGetProduct(id: string) {
  return useQuery<Product>({
    queryKey: [QueryKeys.product, id],
    queryFn: () => 
      api.get(`products/${id}`).catch((error) => {
        return error.response.data; 
      }).then((response) => {
        return response.data;
    })
  })
}
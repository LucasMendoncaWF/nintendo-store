import { useQuery } from "@tanstack/react-query";
import { ProductModel } from "app/models/productModel";
import QueryKeys from "./queryKeys";
import api from "./api";

export function useGetProduct(id: string) {
  return useQuery<ProductModel>({
    queryKey: [QueryKeys.product, id],
    queryFn: () => 
      api.get(`products/${id}`).catch((error) => {
        return error.response.data; 
      }).then((response) => {
        return response.data;
    })
  })
}
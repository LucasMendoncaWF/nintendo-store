import api from "./api";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "./queryKeys";
import { CountryModel } from "app/models/countryModel";

export function useGetCountries() {
  return useQuery<CountryModel[]>({
    queryKey: [QueryKeys.countries],
    queryFn: () => 
      api.get("countries").catch((error) => {
        return error.response.data; 
      }).then((response) => {
        return response.data as CountryModel[];
    })
  })
}

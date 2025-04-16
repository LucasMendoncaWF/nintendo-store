import { CountryModel } from 'app/models/countryModel';

import api from './api';
import QueryKeys from './queryKeys';

import { useQuery } from '@tanstack/react-query';

export function useGetCountries() {
  return useQuery<CountryModel[]>({
    queryKey: [QueryKeys.countries],
    queryFn: () =>
      api
        .get('countries')
        .catch((error) => {
          return error.response.data;
        })
        .then((response) => {
          return response.data as CountryModel[];
        }),
  });
}

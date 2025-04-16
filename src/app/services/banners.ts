import { HomeBannerModel } from 'app/models/bannerModel';

import api from './api';
import QueryKeys from './queryKeys';

import { useQuery } from '@tanstack/react-query';

export function useGetHomeBanners() {
  return useQuery<HomeBannerModel[]>({
    queryKey: [QueryKeys.primaryBanner],
    queryFn: () =>
      api
        .get('banners/homeBanners')
        .catch((error) => {
          return error.response.data;
        })
        .then((response) => {
          return response.data as HomeBannerModel[];
        }),
  });
}

export function useGetSecondaryBanners() {
  return useQuery<HomeBannerModel[]>({
    queryKey: [QueryKeys.secondaryBanner],
    queryFn: () =>
      api
        .get('banners/secondaryBanners')
        .catch((error) => {
          return error.response.data;
        })
        .then((response) => {
          return response.data;
        }),
  });
}

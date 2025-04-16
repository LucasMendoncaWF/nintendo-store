import { maxPerPage } from 'app/constants/constants';
import { FiltersModel, GameModel } from 'app/models/gameModel';

import api from './api';
import QueryKeys from './queryKeys';

import { useQuery } from '@tanstack/react-query';

export function useGetRecentGamesList() {
  const query = { fields: '*, artworks.url, genres.name', limit: 6 };
  return useQuery<GameModel[]>({
    queryKey: [QueryKeys.gamesRecent],
    queryFn: () =>
      api
        .post('igdb/games', query)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        }),
  });
}

export function useGetAllGames({ page, searchTerm }: FiltersModel) {
  const pageSize = maxPerPage;
  const query = {
    fields: '*, artworks.url, genres.name',
    name: searchTerm,
    limit: pageSize,
    offset: pageSize * (page - 1),
  };
  return useQuery<GameModel[]>({
    queryKey: [QueryKeys.allGames, page, searchTerm],
    queryFn: () =>
      api
        .post('igdb/games', query)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        }),
  });
}

export function useGetGamesById({ page, ids, pageLimit }: FiltersModel) {
  const pageSize = pageLimit || maxPerPage;
  const query = {
    fields: '*, artworks.url, genres.name',
    ids,
    limit: pageSize,
    offset: pageSize * (page - 1),
  };
  return useQuery<GameModel[]>({
    queryKey: [QueryKeys.allGames, page, ids],
    queryFn: () =>
      api
        .post('igdb/games', query)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        }),
    enabled: !!(ids && ids.length),
  });
}

export function useGetCartGames({ page, ids, pageLimit }: FiltersModel) {
  const pageSize = pageLimit || maxPerPage;
  const query = {
    fields: '*, artworks.url, genres.name',
    ids,
    limit: pageSize,
    offset: pageSize * (page - 1),
  };
  return useQuery<GameModel[]>({
    queryKey: [QueryKeys.allGames, page, ids],
    queryFn: () =>
      api
        .post('igdb/games/cart', query)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        }),
    enabled: !!(ids && ids.length),
  });
}

export function useGetTotalPages({ page, searchTerm, ids }: FiltersModel) {
  const pageSize = maxPerPage;
  const currentPage = page && page > 0 ? page : 1;
  const query = {
    fields: 'name',
    ids,
    name: searchTerm,
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
  };

  return useQuery<number>({
    queryKey: [QueryKeys.totalPages, page, searchTerm, ids],
    queryFn: () =>
      api
        .post('igdb/games/count', query)
        .then((response) => {
          return response.data.count && response.data.count / maxPerPage;
        })
        .catch((error) => {
          return error;
        }),
  });
}

export function useFetchGame(id: string) {
  const query = {
    fields:
      '*, cover.url, artworks.url, genres.name, screenshots.url, expanded_games.name',
    ids: [id],
  };
  return useQuery<GameModel>({
    queryKey: [QueryKeys.singleGame, query.ids],
    queryFn: () =>
      api
        .post('igdb/games', query)
        .then((response) => {
          return response.data && response.data[0];
        })
        .catch((error) => {
          return error;
        }),
  });
}

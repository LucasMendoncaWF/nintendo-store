import { FiltersModel, GameModel } from "app/models/gameModel";
import api from "./api";

export const maxPerPage = 28;

export async function getRecentGamesList() {
  const query = {fields: '*, cover.url, genres.name', filters : {platforms : 130}, sort: 'first_release_date desc', limit: 6};
  return await api.post<GameModel[]>("igdb/games", 
      query
    ).then(response => {
      return response.data;
    }).catch((error) => {
    return error;
  });
}


export async function getAllGames({
  page,
  searchTerm,
  sort,
  ids
}: FiltersModel) {
  const pageSize = maxPerPage;
  const currentSort = sort || 'desc';
  const query = {fields: '*, cover.url, genres.name', ids, filters : {platforms : 130, name: searchTerm}, sort: 'first_release_date ' + currentSort, limit: pageSize, offset: pageSize * (page - 1)};
  return await api.post<GameModel[]>("igdb/games", 
      query
    ).then(response => {
      return response.data;
    }).catch((error) => {
    return error;
  });
}

export async function getTotalPages({
  page,
  searchTerm,
  sort,
  ids,
}: FiltersModel) {
  const pageSize = maxPerPage;
  const currentPage = page && page > 0 ? page : 1; 
  const currentSort = sort || 'desc';
  const query = {fields: '*, cover.url, genres.name', ids, filters : {platforms : 130, name: searchTerm}, sort: 'first_release_date ' + currentSort, limit: pageSize, offset: pageSize * (currentPage - 1)};
  
  return await api.post<GameModel[]>("igdb/games/count", 
      query
    ).then(response => {
      return response.data;
    }).catch((error) => {
    return error;
  });
}

export async function fetchGame({
  ids
}: FiltersModel) {
  const query = {fields: '*, cover.url, genres.name', ids};
  return await api.post<GameModel[]>("igdb/games", 
      query
    ).then(response => {
      return response.data;
    }).catch((error) => {
    return error;
  });
}
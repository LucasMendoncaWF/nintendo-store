import { FiltersModel, GameModel } from "app/models/gameModel";
import api from "./api";

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
  genres,
  searchTerm,
  sort,
  ids
}: FiltersModel) {
  const pageSize = 28;
  const currentSort = sort || 'desc';
  const query = {fields: '*, cover.url, genres.name', ids, filters : {platforms : 130}, name: searchTerm, genres, sort: 'first_release_date ' + currentSort, limit: pageSize, offset: pageSize * (page - 1)};
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
  genres,
  searchTerm,
  sort
}: FiltersModel) {
  const pageSize = 28;
  const currentPage = page && page > 0 ? page : 1; 
  const currentSort = sort || 'desc';
  const query = {fields: '*, cover.url, genres.name', filters : {platforms : 130, name: searchTerm, genres}, sort: 'first_release_date ' + currentSort, limit: pageSize, offset: pageSize * currentPage};
  
  return await api.post<GameModel[]>("igdb/games/count", 
      query
    ).then(response => {
      return response.data;
    }).catch((error) => {
    return error;
  });
}
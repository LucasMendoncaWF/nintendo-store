export interface GameModel {
  cover: {
    id: number;
    url: string;
  };
  summary: string;
  name: string;
  id: number;
  first_release_date: number;
  genres: GameGenreModel[];
  price: number;
}

export interface GameGenreModel {
  id: number;
  name: string;
}

export interface FiltersModel {
  page: number;
  searchTerm?: string;
  genres?: number[];
  sort?: 'desc' | 'asc';
  totalPages?: number;
  ids?: number[];
}
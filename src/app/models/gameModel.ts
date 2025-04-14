export interface GameModel {
  cover: GameImage;
  screenshots: GameImage[];
  artworks: GameImage[];
  summary: string;
  name: string;
  id: number;
  first_release_date: number;
  genres: GameGenreModel[];
  price: number;
  similar_games: number[];
  expanded_games: GameGenreModel[];
}

export interface GameGenreModel {
  id: number;
  name: string;
}

export interface GameImage {
  id: number;
  url: string;
}

export interface FiltersModel {
  page: number;
  pageLimit?: number;
  searchTerm?: string;
  totalPages?: number;
  ids?: number[];
  id?: number;
}
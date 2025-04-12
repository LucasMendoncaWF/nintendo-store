import {useEffect } from "react";
import Loader from "../Loader";
import GameItem from "./GameItem";
import { GameModel } from "app/models/gameModel";
import ErrorMessage from "../ErrorMessage";
import './gamesList.scss';

interface Props {
  title: string;
  games?: GameModel[];
  isLoading: boolean;
  hasError: boolean;
  isEmptyResponse: boolean;
  hasAutoScroll?: boolean
}

export default function GamesList ({
  title, 
  games,
  isLoading,
  hasError,
  isEmptyResponse,
  hasAutoScroll
}: Props) {
  useEffect(() => {
    if(hasAutoScroll) {
      window.scrollTo({behavior: 'smooth', top: 0});
    }
  }, [games, hasAutoScroll]);
  
  return (
    <div>
      <div className='d-flex wrap games-list justify-content-center'> 
        {title && 
          <h2 className="games-list__title d-flex space-between wrap align-center">
            {title}
          </h2>
        }
        
        {!isLoading && games?.map(game => (
          <GameItem 
            game={game} 
            key={game.id}
          />
        ))}
      </div>

      <div className="d-flex justify-content-center">
        {isLoading && <Loader />}
        {hasError && <ErrorMessage message={'An error occurred while trying to get the latest games.'}/>}
        {isEmptyResponse && <ErrorMessage message={'No games with that filters were found.'}/>}
      </div>

    </div>
  )
}
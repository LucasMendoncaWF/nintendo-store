import { getHomeBanners, getSecondaryBanners } from 'app/services/banners';
import HomeBannerItem from './HomeBannerItem';
import SecondaryBannerItem from './SecondaryBannerItem';
import { useCallback, useEffect, useState } from 'react'
import { HomeBannerModel } from 'app/models/HomeBannerModel';
import GamesList from 'app/components/shared/GamesList';
import Loader from 'app/components/shared/Loader';
import { getRecentGamesList } from 'app/services/gamesSearch';
import { GameModel } from 'app/models/gameModel';

export default function Home () {
  const [banners, setBanners] = useState<HomeBannerModel[]>([]);
  const [secondaryBanners, setSecondaryBanners] = useState<HomeBannerModel[]>([]);
  const [games, setGames] = useState<GameModel[]>([]);
  const [hasError, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getGames = useCallback(async () => {
    const gamesResponse = await getRecentGamesList();
    setIsLoading(false);
    if(gamesResponse.status) {
      setGames([]);
      setError(true);
      return;
    }

    if(gamesResponse) {
      setGames(gamesResponse);
      setError(false);
    }
  }, []);

  const geBanners = useCallback(async () => {
    const bannersResponse = await getHomeBanners();
    if(bannersResponse) {
      setBanners(bannersResponse.data);
    }

    const secondaryBannersResponse = await getSecondaryBanners();
    if(secondaryBannersResponse) {
      setSecondaryBanners(secondaryBannersResponse.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getGames();
    geBanners();
  }, [getGames, geBanners])

  return (
    <div className="home">
      {
        isLoading && <div className='d-flex justify-content-center'><Loader /></div>
      }
      <div className='d-flex wrap'>
        {banners?.map((banner, index) => (
          <HomeBannerItem key={index} banner={banner} />
        ))}
      </div>
      <div className='d-flex wrap justify-content-center margin-top-2 margin-bottom-2'>
        {secondaryBanners?.map((banner, index) => (
          <SecondaryBannerItem key={index} banner={banner} />
        ))}
      </div>
      <div className='margin-top'>
        <GamesList
          games={games}
          hasError={hasError}
          isEmptyResponse={!hasError && !isLoading && !games.length}
          isLoading={isLoading}
          title='New Games'
        />
      </div>
    </div>
  );
}
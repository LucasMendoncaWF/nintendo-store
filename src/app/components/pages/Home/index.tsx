import GamesList from 'app/components/shared/GamesList';
import Loader from 'app/components/shared/Loader';
import {
  useGetHomeBanners,
  useGetSecondaryBanners,
} from 'app/services/banners';
import { useGetRecentGamesList } from 'app/services/gamesSearch';

import HomeBannerItem from './HomeBannerItem';
import SecondaryBannerItem from './SecondaryBannerItem';

export default function Home() {
  const { data: games, isError, isLoading } = useGetRecentGamesList();

  // No error treatment because this data is mocked
  const { data: banners, isLoading: isLoadingPrimaryBanner } =
    useGetHomeBanners();

  const { data: secondaryBanners, isLoading: isLoadingSecondaryBanner } =
    useGetSecondaryBanners();

  return (
    <div className="home">
      {(isLoadingSecondaryBanner || isLoadingPrimaryBanner) && <Loader />}
      <div className="d-flex wrap">
        {banners?.map((banner, index) => (
          <HomeBannerItem key={index} banner={banner} />
        ))}
      </div>
      <div className="d-flex wrap justify-content-center margin-top-2 margin-bottom-2">
        {secondaryBanners?.map((banner, index) => (
          <SecondaryBannerItem key={index} banner={banner} />
        ))}
      </div>
      <div className="margin-top">
        <GamesList
          games={games}
          hasError={isError}
          isEmptyResponse={!isError && !isLoading && !games?.length}
          isLoading={isLoading}
          title="New Games"
        />
      </div>
    </div>
  );
}

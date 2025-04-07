import { getHomeBanners, getSecondaryBanners } from 'app/services/banners';
import HomeBannerItem from './HomeBannerItem';
import SecondaryBannerItem from './SecondaryBannerItem';
import { useEffect, useRef, useState } from 'react'
import { HomeBannerModel } from 'app/models/HomeBannerModel';
import GamesList from 'app/components/shared/GamesList';
import Loader from 'app/components/shared/Loader';

export default function Home () {
  const [banners, setBanners] = useState<HomeBannerModel[]>([]);
  const [secondaryBanners, setSecondaryBanners] = useState<HomeBannerModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const timesLoaded = useRef(0)

  useEffect(() => {
    if(timesLoaded.current > 0) return;
    timesLoaded.current += 1;
    geBanners();
  })

  const geBanners = async () => {
    const bannersResponse = await getHomeBanners();
    if(bannersResponse) {
      setBanners(bannersResponse.data);
    }

    const secondaryBannersResponse = await getSecondaryBanners();
    if(secondaryBannersResponse) {
      setSecondaryBanners(secondaryBannersResponse.data);
    }
    setIsLoading(false);
  }

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
        <GamesList type='recent'/>
      </div>
    </div>
  );
}
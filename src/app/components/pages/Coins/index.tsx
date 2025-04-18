import { useRef, useState } from 'react';

import { useUserStore } from 'app/stores/userStore';
import CoinsContainerBack from 'assets/images/coin-container-back.png';
import CoinsContainer from 'assets/images/coin-container.png';
import CoinsBannerMobile from 'assets/images/coins-banner-mobile.jpg';
import CoinsBanner from 'assets/images/coins-banner.jpg';

import './coins.scss';

export default function Coins() {
  const { isLoggedIn, toggleLoginModal } = useUserStore();
  const [appearCoin, setAppearCoin] = useState(false);
  const sessionAmount = sessionStorage.getItem('coins');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [amount, setAmount] = useState(
    sessionAmount ? Number(sessionAmount) : 0,
  );
  const maxCoin = 100;
  const amountPerClick = 10;
  const isCollecting = useRef(false);
  const onGetCoin = () => {
    setAppearCoin(true);
    if (amount < maxCoin) {
      isCollecting.current = true;
      // this info would go to a database if I was able to use one on netlify
      sessionStorage.setItem('coins', (amount + amountPerClick).toFixed());

      setTimeout(() => {
        setAmount(amount + amountPerClick);
      }, 550);

      setTimeout(() => {
        setAppearCoin(false);
        isCollecting.current = false;
      }, 2000);
    }
  };

  return (
    <div className="coin-page">
      <h3 className="coin-page__title">Your Coins</h3>
      <div className="coin-page__banner">
        <img
          className="hide-mobile"
          alt="mario coins banner"
          src={CoinsBanner}
        />
        <img
          className="show-mobile"
          alt="mario coins banner"
          src={CoinsBannerMobile}
        />
      </div>
      <div className="coin-page__collector-area">
        <div className="coin-page__collector-area__container">
          {imageLoaded && (
            <div
              className={`coin-page__collector-area__container__amount__per-click ${appearCoin && 'appear'}`}
            >
              +{amountPerClick}
            </div>
          )}
          {imageLoaded && (
            <div
              className={`coin-page__collector-area__container__amount ${appearCoin && 'appear'}`}
            >
              {amount}
            </div>
          )}
          {imageLoaded && (
            <img
              className={`image-back ${appearCoin && 'appear'}`}
              alt="coin container"
              src={CoinsContainerBack}
            />
          )}
          <div className={`coin-page__coin ${appearCoin && 'appear'}`} />
          <img
            className={`image-front ${appearCoin && 'appear'}`}
            onLoad={() => setImageLoaded(true)}
            alt="coin container"
            src={CoinsContainer}
          />
        </div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={() => !isCollecting.current && onGetCoin()}
              disabled={amount >= maxCoin || isCollecting.current}
              className="coin-page__collector-area__button"
            >
              {amount < maxCoin ? 'Collect your coins!' : 'Come back tomorrow!'}
            </button>
          ) : (
            <button
              onClick={() => toggleLoginModal(true)}
              className="coin-page__collector-area__button"
            >
              Log in to get your coins!
            </button>
          )}
        </div>
      </div>
      <div className="coin-page__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non
        ante dolor. Vivamus ultrices, leo placerat pretium pulvinar, ante dui
        placerat libero, in vestibulum dolor magna in odio. Nullam feugiat
        vestibulum mollis. Nullam risus risus, faucibus nec nisl eget, semper
        feugiat augue. Vestibulum pulvinar quam in rutrum elementum. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Nulla quis erat vel tortor pulvinar laoreet eu vel
        sapien. Proin molestie tempus tempor. Quisque egestas metus mi, eget
        mattis nibh blandit a. Vivamus elit risus, molestie in lectus in,
        gravida sagittis augue. Aliquam ullamcorper libero in lacus tincidunt,
        non dictum diam dictum. Aenean nibh sapien, sodales eget vehicula sit
        amet, elementum id felis. Quisque vitae hendrerit odio. Integer purus
        leo, tempor sit amet lorem ac, tempus rhoncus nisi. Mauris porta
        vulputate nisi eu posuere. Fusce sed lobortis nibh, sed varius sapien.
        Aliquam ac congue augue. Sed eget arcu in ipsum laoreet sagittis.
        Pellentesque convallis a nibh ut pulvinar. Integer id turpis vitae purus
        consequat ultrices faucibus non nisl.
      </div>
    </div>
  );
}

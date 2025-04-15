import { HomeBannerModel } from 'app/models/homeBannerModel';
import { Link } from "react-router-dom";
import './homeBannerItem.scss';

interface Props {
  banner: HomeBannerModel;
}

export default function HomeBannerItem ({banner}: Props) {
  return (
    <div className="home-banner" style={{backgroundImage: `url(${banner.image})`}}>
      <Link to={banner.url}>
        <div className="home-banner__text">
          <div className="home-banner__title">{banner.buttonText}</div>
          <div className="home-banner__description">
            <h4>{banner.title}</h4>
            <p>{banner.text}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
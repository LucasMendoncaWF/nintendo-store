import { HomeBannerModel } from 'app/models/HomeBannerModel';
import './homeBannerItem.scss';
import { Link } from "react-router-dom";

interface Props {
  banner: HomeBannerModel;
}

export default function HomeBannerItem ({banner}: Props) {
  return (
    <div className="home-banner" style={{backgroundImage: `url(${banner.image})`}}>
      <Link to={banner.url}>
        <div className="home-banner__text">
          <div className="home-banner__title">{banner.title}</div>
          <div className="home-banner__description">
            <p>{banner.text}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
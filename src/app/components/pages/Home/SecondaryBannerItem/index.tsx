import { HomeBannerModel } from 'app/models/HomeBannerModel';
import './secondaryBannerItem.scss';
import { Link } from "react-router-dom";

interface Props {
  banner: HomeBannerModel;
}

export default function SecondaryBannerItem ({banner}: Props) {
  return (
    <Link to={banner.url} className="secondary-banner" style={{backgroundImage: `url(${banner.image})`}}>
      <div className="secondary-banner__button"></div>
      <div className="secondary-banner__text">{banner.buttonText}</div>
    </Link>
  )
}
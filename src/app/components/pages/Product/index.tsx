import { useParams } from 'react-router-dom';
import { useGetProduct } from 'app/services/products';
import './product.scss';
import { useState } from 'react';
import Loader from 'app/components/shared/Loader';

export default function Product () {
  const params = useParams();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const {
    isFetching,
    data: product,
  } = useGetProduct(params.id || '');

  if(isFetching) {
    return <div className='d-flex justify-content-center'>
      <div className=' margin-top-2 margin-bottom-2'>
        <Loader />
      </div>
    </div>
  }

  return (
    <div className='product-page'>
      <h3 className='product-page__title'>{product?.title}</h3>
      <div className='product-page__container d-flex wrap'>
        <div className='product-page__banner'>
          <img alt="product banner" className={isImageLoaded ? 'd-block' : 'd-none'} onLoad={() => setIsImageLoaded(true)} src={product?.bannerUrl} />
          {!isImageLoaded && <div className='product-page__banner__loading'/>}
        </div>
        <div className='product-page__text'>
          {product?.text}
        </div>
      </div>
      
      <div className='product-page__container d-flex'>
        <div className='product-page__text product-page__text--second'>
            {product?.text2}
        </div>
      </div>
      <div className='product-page__container d-flex justify-content-center'>
        <button className='product-page__button'>Get yours now!</button>
      </div>
    </div>
  )
}
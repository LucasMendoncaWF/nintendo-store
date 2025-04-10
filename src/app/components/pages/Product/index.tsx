import './product.scss';
import { useParams } from 'react-router-dom';
import { useGetProduct } from 'app/services/products';

export default function Product () {
  const params = useParams();

  const {
    data: product,
  } = useGetProduct(params.id || '');

  console.log(product)
  return (
    <div className='product-page'>
      <h3 className='product-page__title'>{product?.title}</h3>
      <div className='product-page__container d-flex wrap'>
        <div className='product-page__banner'>
          <img alt="product banner" src={product?.bannerUrl} />
        </div>
        <div className='product-page__text'>
          {product?.text}
        </div>
      </div>
      <div className='product-page__container d-flex'>
        <button className='product-page__button'>Get one now!</button>
      </div>
      <div className='product-page__container d-flex'>
      <div className='product-page__text product-page__text--second'>
          {product?.text2}
        </div>
      </div>
    </div>
  )
}
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ProductBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';
import { toggleFavoriteProduct } from '../../../redux/productsRedux';
import StarsRating from '../../features/StarsRating/StarsRating';
import { toggleProductCompare, getCompare } from '../../../redux/productsRedux';

const ProductBox = ({
  name,
  price,
  image,
  promo,
  stars,
  isFavorite,
  id,
  priceOld,
  ownStars,
  compare,
}) => {
  const dispatch = useDispatch();
  const productId = id;

  const handleClick = e => {
    e.preventDefault();
    dispatch(toggleFavoriteProduct(productId));
  };

  const getCompareProducts = useSelector(state => getCompare(state));

  const handleCompare = e => {
    e.preventDefault();
    if (getCompareProducts.length < 4) {
      dispatch(toggleProductCompare(productId));
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.photo}>
        <img className={styles.images} src={image} alt='furniture' />
        {promo && <div className={styles.sale}>{promo}</div>}
        <div className={styles.buttons}>
          <Button variant='small'>Quick View</Button>
          <Button variant='small'>
            <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon> ADD TO CART
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <h5>{name}</h5>
        <StarsRating id={id} ownStars={ownStars} stars={stars} />
      </div>
      <div className={styles.line}></div>
      <div className={styles.actions}>
        <div className={styles.outlines}>
          <Button
            variant='outline'
            className={isFavorite ? styles.isFavorite : ''}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faHeart}>Favorite</FontAwesomeIcon>
          </Button>
          <Button
            variant='outline'
            className={compare ? styles.compare : ''}
            onClick={handleCompare}
          >
            <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
          </Button>
        </div>
        {priceOld && (
          <div className={styles.priceold}>
            <Button noHover variant='light'>
              $ {priceOld.toFixed(2)}
            </Button>
          </div>
        )}
        <div>
          <Button className={styles.price} noHover variant='small'>
            $ {price.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
};
ProductBox.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  price: PropTypes.number,
  priceOld: PropTypes.number,
  image: PropTypes.string,
  promo: PropTypes.string,
  stars: PropTypes.number,
  isFavorite: PropTypes.bool,
  id: PropTypes.string,
  ownStars: PropTypes.number,
  compare: PropTypes.bool,
};

export default ProductBox;

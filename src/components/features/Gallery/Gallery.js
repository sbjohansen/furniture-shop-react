/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import styles from './Gallery.module.scss';
import Button from '../../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faExchangeAlt,
  faEye,
  faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import StarsRating from '../StarsRating/StarsRating';
import Swipe from '../../common/Swipe/Swipe';
import {
  getAll,
  getCompare,
  toggleProductCompare,
  toggleFavoriteProduct,
} from '../../../redux/productsRedux';
import { getGalleryCategories } from '../../../redux/categoriesRedux';
import { getMediaQuery } from '../../../redux/settingsReducer';

const Gallery = () => {
  const dispatch = useDispatch();
  const fadeTimer = 250;
  const allProducts = useSelector(getAll);
  const mediaQuery = useSelector(getMediaQuery);
  const galleryCategories = useSelector(getGalleryCategories);
  const getCompareProducts = useSelector(getCompare);
  const [activatePhotoFade, setActivatePhotoFade] = useState(false);
  const [activateSliderFade, setActivateSliderFade] = useState(false);
  const [activeCategory, setActiveCategory] = useState('topSeller');
  const [productIndex, setProductIndex] = useState(0);
  const [thumbnailProductsAmount, setThumbnailProductsAmount] = useState(6);

  const categoryProducts = allProducts.filter(
    item => item.galleryCategory === activeCategory
  );

  const [activeProduct, setActiveProduct] = useState(categoryProducts[0].id);
  const handleCategoryChange = (e, newCategory) => {
    e.preventDefault();
    setActivatePhotoFade(true);
    setActivateSliderFade(true);

    setTimeout(() => {
      setActiveCategory(newCategory);
      setActivatePhotoFade(false);
      setActivateSliderFade(false);
    }, fadeTimer);
  };

  useEffect(() => {
    setActiveProduct(categoryProducts[0].id);
  }, [activeCategory]);

  const handleProductChange = (e, newProduct) => {
    e.preventDefault();
    setActivatePhotoFade(true);

    setTimeout(() => {
      setActiveProduct(newProduct);
      setActivatePhotoFade(false);
    }, fadeTimer);
  };

  useEffect(() => {
    setProductIndex(categoryProducts.indexOf(showProduct));
  }, [activeProduct]);

  const showProduct = allProducts.find(item => item.id === activeProduct);

  const handleCompare = (e, id) => {
    e.preventDefault();
    if (getCompareProducts.length < 4) {
      dispatch(toggleProductCompare(id));
    }
  };

  const handleFavorite = (e, id) => {
    e.preventDefault();
    dispatch(toggleFavoriteProduct(id));
  };

  useEffect(() => {
    if (mediaQuery === 'desktop') setThumbnailProductsAmount(6);
    if (mediaQuery === 'tablet') setThumbnailProductsAmount(5);
    if (mediaQuery === 'mobile') setThumbnailProductsAmount(3);
  }, [mediaQuery]);

  const handleRight = e => {
    e.preventDefault();

    if (productIndex < thumbnailProductsAmount - 1) {
      setActivatePhotoFade(true);
      setTimeout(() => {
        setActiveProduct(categoryProducts[productIndex + 1].id);
        setActivatePhotoFade(false);
      }, fadeTimer);
    }
  };

  const handleLeft = e => {
    e.preventDefault();
    if (productIndex > 0) {
      setActivatePhotoFade(true);
      setTimeout(() => {
        setActiveProduct(categoryProducts[productIndex - 1].id);
        setActivatePhotoFade(false);
      }, fadeTimer);
    }
  };

  const rightAction = () => {
    if (productIndex > 0) {
      setActivatePhotoFade(true);
      setTimeout(() => {
        setActiveProduct(categoryProducts[productIndex - 1].id);
        setActivatePhotoFade(false);
      }, fadeTimer);
    }
  };

  const leftAction = () => {
    if (productIndex < thumbnailProductsAmount - 1) {
      setActivatePhotoFade(true);
      setTimeout(() => {
        setActiveProduct(categoryProducts[productIndex + 1].id);
        setActivatePhotoFade(false);
      }, fadeTimer);
    }
  };

  const handleClick = e => {
    //placeholder
    e.preventDefault();
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className={styles.panelBar}>
              <div className='row no-gutters align-items-end'>
                <div className={'col-12 ' + styles.heading}>
                  <h3>Furniture Gallery</h3>
                </div>
              </div>
            </div>

            {/* Menu on top */}
            <div className={styles.menu}>
              <ul>
                {galleryCategories.map(item => (
                  <li key={item.id}>
                    <Link
                      to='#'
                      className={item.id === activeCategory ? styles.active : ''}
                      onClick={e => handleCategoryChange(e, item.id)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Left box */}
            <Swipe leftAction={leftAction} rightAction={rightAction}>
              <div className={styles.box_left}>
                <div
                  className={
                    activatePhotoFade === true
                      ? styles.fadeIn + ' ' + styles.promoted
                      : styles.fadeOut + ' ' + styles.promoted
                  }
                >
                  <img
                    src={showProduct.image}
                    alt={showProduct.name}
                    className={styles.images}
                  ></img>
                  <div className={styles.actions}>
                    <div className={styles.outlines}>
                      <Button
                        className={
                          showProduct.isFavorite ? 'mb-1 ' + styles.isFavorite : 'mb-1'
                        }
                        variant='outline-orange'
                        data-tip='Add to favorite'
                        data-for='favorite'
                        onClick={e => handleFavorite(e, showProduct.id)}
                      >
                        <FontAwesomeIcon icon={faHeart}>Favorite</FontAwesomeIcon>
                      </Button>
                      <ReactTooltip
                        id='favorite'
                        place='right'
                        type='dark'
                        effect='float'
                      />
                      <Button
                        className={
                          showProduct.compare ? 'mb-1 ' + styles.compare : 'mb-1'
                        }
                        variant='outline-orange'
                        data-tip='Add to compare'
                        data-for='compare'
                        onClick={e => handleCompare(e, showProduct.id)}
                      >
                        <FontAwesomeIcon icon={faExchangeAlt}>
                          Add to compare
                        </FontAwesomeIcon>
                      </Button>
                      <ReactTooltip
                        id='compare'
                        place='right'
                        type='dark'
                        effect='float'
                      />
                      <Button
                        className='mb-1'
                        variant='outline-orange'
                        data-tip='Quick View'
                        data-for='view'
                        onClick={e => handleClick(e)}
                      >
                        <FontAwesomeIcon icon={faEye}>Show</FontAwesomeIcon>
                      </Button>
                      <ReactTooltip
                        id='view'
                        place='right'
                        type='dark'
                        effect='float'
                      />
                      <Button
                        className=''
                        variant='outline-orange'
                        data-tip='Add to cart'
                        data-for='cart'
                        onClick={e => handleClick(e)}
                      >
                        <FontAwesomeIcon icon={faShoppingBasket}>
                          Add to cart
                        </FontAwesomeIcon>
                      </Button>
                      <ReactTooltip
                        id='cart'
                        place='right'
                        type='dark'
                        effect='float'
                      />
                    </div>
                  </div>
                  <div className={styles.product_info}>
                    <div className={styles.price}>
                      <p className='m-0'>${showProduct.price}</p>
                      <p className={styles.old_price}>
                        {showProduct.priceOld ? '$' + showProduct.priceOld : ' $160'}
                      </p>
                    </div>
                  </div>
                  <div className={styles.frame_wrapper}>
                    <div className={styles.frame}>
                      <p className={styles.product_name}>{showProduct.name}</p>
                      <StarsRating id={showProduct.id} stars={showProduct.stars} />
                    </div>
                  </div>
                </div>
              </div>
            </Swipe>

            {/* Thumbnail menu on the bottom  */}
            <Swipe leftAction={leftAction} rightAction={rightAction}>
              <div
                className={
                  activateSliderFade === true
                    ? styles.fadeIn + ' ' + styles.thumbnailNavigationWrapper
                    : styles.fadeOut + ' ' + styles.thumbnailNavigationWrapper
                }
              >
                <Button
                  className={styles.arrow}
                  variant='small'
                  onClick={e => handleLeft(e)}
                >
                  <FontAwesomeIcon icon={faAngleLeft}>Left</FontAwesomeIcon>
                </Button>
                <div className={styles.thumbnailMenu}>
                  <ul>
                    {categoryProducts.slice(0, thumbnailProductsAmount).map(item => (
                      <li key={item.id}>
                        <Link
                          to='#'
                          className={
                            item.id === activeProduct ? styles.activeThumbnail : ''
                          }
                          onClick={e => handleProductChange(e, item.id)}
                        >
                          <img src={item.image} alt='chair'></img>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className={styles.arrow}
                  variant='small'
                  onClick={e => handleRight(e)}
                >
                  <FontAwesomeIcon icon={faAngleRight}>Right</FontAwesomeIcon>
                </Button>
              </div>
            </Swipe>
          </div>

          {/*  Right Box  */}
          <div className='col-md-6'>
            <div className={styles.box_right}>
              <div className={styles.right_image}>
                <img src='/images/gallery/gallery-bedroom-1.png' alt='bed'></img>
                <div className={'row ' + styles.promo_wrapper}>
                  <h5>
                    FROM <span className={styles.promo_price}>$50.80</span>
                  </h5>
                  <h3 className={styles.promo_name}>Bedroom Bed</h3>
                  <Button variant='main' className={styles.promo_button}>
                    SHOP NOW
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

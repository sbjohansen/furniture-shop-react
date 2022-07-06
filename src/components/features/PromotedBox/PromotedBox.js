import React, { useState, useEffect, useRef } from 'react';
//import PropTypes from 'prop-types';
import styles from './PromotedBox.module.scss';
import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faExchangeAlt,
  faEye,
  faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons';
import StarsRating from '../StarsRating/StarsRating';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCompare,
  getHotDeals,
  getPromo,
  toggleFavoriteProduct,
  toggleProductCompare,
} from '../../../redux/productsRedux';

const PromotedBox = () => {
  const [activePage, setActivePage] = useState(0);
  const [activePagePromo, setActivePagePromo] = useState(0);

  const [delay, setDelay] = useState(3000);
  const [activateFade, setActivateFade] = useState('');
  const hotDealsData = useSelector(getHotDeals);
  const pagesCount = hotDealsData.length;
  const dispatch = useDispatch();
  const promoData = useSelector(getPromo);

  const handlePageChange = newPage => {
    setDelay(10000);
    setActivateFade('left');
    setTimeout(() => {
      setActivePage(newPage);
      setTimeout(() => setActivateFade(''), 250);
    }, 250);
  };

  const getCompareProducts = useSelector(state => getCompare(state));

  //onClick functions
  const handleCompare = (e, item) => {
    e.preventDefault();
    if (getCompareProducts.length < 4) {
      dispatch(toggleProductCompare(item.id));
    }
  };

  const handleFavorite = (e, item) => {
    e.preventDefault();
    dispatch(toggleFavoriteProduct(item.id));
  };

  const handleShow = e => {
    e.preventDefault();
    //placeholder
  };

  //autoplay for left slider
  const timeoutRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setActivateFade(''), 250);

    timeoutRef.current = setTimeout(() => {
      setTimeout(() => {
        setActivePage(prevIndex =>
          prevIndex === hotDealsData.length - 1 ? 0 : prevIndex + 1
        );
      }, 250);
      setActivateFade('left');
    }, delay);

    if (delay === 10000) {
      setDelay(3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const dots = [];
  for (let i = 0; i < pagesCount; i++) {
    dots.push(
      <li key={i}>
        <Link
          to='#'
          onClick={() => handlePageChange(i)}
          className={i === activePage ? styles.active : ''}
        >
          page {i}
        </Link>
      </li>
    );
  }

  const rightAction = e => {
    e.preventDefault();
    setActivateFade('right');
    setTimeout(() => {
      setActivePagePromo(activePagePromo + 1);
      if (activePagePromo >= promoData.length - 1) {
        setActivePagePromo(activePagePromo);
      }
    }, 250);

    if (activateFade === '') {
      setTimeout(() => {
        setActivateFade('');
      }, 250);
    }
  };

  const leftAction = e => {
    e.preventDefault();
    setActivateFade('right');
    setTimeout(() => {
      setActivePagePromo(activePagePromo - 1);
      if (activePagePromo <= 0) {
        setActivePagePromo(0);
      }
    }, 250);

    if (activateFade === '') {
      setTimeout(() => {
        setActivateFade('');
      }, 250);
    }
  };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            {hotDealsData.slice(activePage, activePage + 1).map(item => (
              <div key={item.id} className={styles.productBox}>
                <div className={styles.topBar}>
                  <div className={'col-md-8 ' + styles.title}>HOT DEALS</div>
                  <div className={'col-md-4 ' + styles.dots}>
                    <ul>{dots}</ul>
                  </div>
                </div>
                <div key={item.id} className={styles.photoBox}>
                  <div
                    className={activateFade === 'left' ? styles.fadeIn : styles.fadeOut}
                  >
                    <img className={styles.images} src={item.image} alt='furniture' />
                  </div>

                  <div className={styles.buttons}>
                    <Button variant='small' className='pt-2 pb-2'>
                      <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon> ADD TO
                      CART
                    </Button>
                  </div>
                  <div className={styles.timerWrapper}>
                    <div className={styles.timerText}>
                      <div className={styles.textBig}>25</div>
                      <div className={styles.textSmall}>DAYS</div>
                    </div>
                    <div className={styles.timerText}>
                      <div className={styles.textBig}>11</div>
                      <div className={styles.textSmall}>HRS</div>
                    </div>
                    <div className={styles.timerText}>
                      <div className={styles.textBig}>45</div>
                      <div className={styles.textSmall}>MINS</div>
                    </div>
                    <div className={styles.timerText}>
                      <div className={styles.textBig}>25</div>
                      <div className={styles.textSmall}>SECS</div>
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <h5> {item.name}</h5>
                  <StarsRating
                    id={item.id}
                    stars={item.stars}
                    ownStars={item.ownStars}
                  />
                </div>
                <div className={styles.line}></div>
                <div className={styles.actions}>
                  <div>
                    <Button
                      className='mr-1'
                      variant='outline'
                      onClick={e => handleShow(e)}
                    >
                      <FontAwesomeIcon icon={faEye}>Show</FontAwesomeIcon>
                    </Button>
                    <Button
                      variant='outline'
                      className={(item.isFavorite ? styles.isFavorite : '') + ' mr-1'}
                      onClick={e => handleFavorite(e, { ...item })}
                    >
                      <FontAwesomeIcon icon={faHeart}>Favorite</FontAwesomeIcon>
                    </Button>
                    <Button
                      variant='outline'
                      className={item.compare ? styles.compare : ''}
                      onClick={e => handleCompare(e, { ...item })}
                    >
                      <FontAwesomeIcon icon={faExchangeAlt}>
                        Add to compare
                      </FontAwesomeIcon>
                    </Button>
                  </div>
                  {item.priceOld && (
                    <div className={styles.priceold}>
                      <Button noHover variant='light'>
                        $ {item.priceOld.toFixed(2)}
                      </Button>
                    </div>
                  )}
                  <div className={styles.price}>
                    <Button noHover variant='small'>
                      $ {item.price.toFixed(2)}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-8'>
            {promoData.slice(activePagePromo, activePagePromo + 1).map(item => (
              <div key={item.id} className={styles.promoWrapper}>
                <div
                  className={activateFade === 'right' ? styles.fadeIn : styles.fadeOut}
                >
                  <img src={item.image} alt={item.imageAlt} />
                  <div className={styles.banner}>
                    <div className={styles.titleWrapper}>
                      <div>{item.titleFirst}</div>
                      <div>{item.titleSecond}</div>
                    </div>
                    <div className={styles.bannerSubTitle}>{item.subtitle} </div>
                  </div>
                  <Button className={styles.shopNow} variant='small'>
                    SHOP NOW
                  </Button>
                </div>

                <div className={styles.promoNavigationWrapper}>
                  <Button
                    className={styles.arrow}
                    variant='small'
                    onClick={e => leftAction(e)}
                  >
                    <FontAwesomeIcon icon={faAngleLeft}>Left</FontAwesomeIcon>
                  </Button>
                  <Button
                    className={styles.arrow}
                    variant='small'
                    onClick={e => rightAction(e)}
                  >
                    <FontAwesomeIcon icon={faAngleRight}>Right</FontAwesomeIcon>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotedBox;

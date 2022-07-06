import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getAllBrands } from '../../../redux/brandsRedux';
import { getMediaQuery } from '../../../redux/settingsReducer';

import styles from './Brands.module.scss';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Brands = () => {
  const allBrands = useSelector(getAllBrands);
  const [activeBrands, setActiveBrands] = useState(0);
  const mediaQuery = useSelector(getMediaQuery);
  const [brandsAmount, setBrandsAmount] = useState(6);

  useEffect(() => {
    if (mediaQuery === 'desktop') {
      setBrandsAmount(6);
    }
    if (mediaQuery === 'tablet') {
      setBrandsAmount(2);
    }
    if (mediaQuery === 'mobile') {
      setBrandsAmount(2);
    }
  }, [mediaQuery]);

  const handleLeftSlide = e => {
    e.preventDefault();
    if (activeBrands > brandsAmount - activeBrands - 1) {
      setActiveBrands(activeBrands - brandsAmount);
    }
  };

  const handleRightSlide = e => {
    e.preventDefault();
    if (activeBrands < brandsAmount - activeBrands) {
      setActiveBrands(activeBrands + brandsAmount);
    }
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className='row'>
          <div className={styles.thumbnailNavigationWrapper}>
            <Button
              className={styles.arrow}
              variant='small'
              onClick={e => handleLeftSlide(e)}
            >
              <FontAwesomeIcon icon={faAngleLeft}>Left</FontAwesomeIcon>
            </Button>
            <div className={styles.thumbnailMenu}>
              <ul>
                {allBrands
                  .slice(activeBrands, activeBrands + brandsAmount)
                  .map(item => (
                    <li key={item.id}>
                      <Link to='#' className={styles.activeThumbnail}>
                        <img src={item.image} alt='brands' />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <Button
              className={styles.arrow}
              variant='small'
              onClick={e => handleRightSlide(e)}
            >
              <FontAwesomeIcon icon={faAngleRight}>Right</FontAwesomeIcon>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;

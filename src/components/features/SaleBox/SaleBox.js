import React from 'react';
import PropTypes from 'prop-types';

import styles from './SaleBox.module.scss';

const SaleBox = sale_img => {
  return (
    <div>
      <div className='container'>
        <div className={styles.wrapper}>
          <div className={styles.left_inner}>
            <div className={styles.box_img}>
              <img src='./images/sales/promotion-bed.jpg' alt='sale-left' />
            </div>
            <p className={styles.promo_text}>
              GUEST ROOM<span> SOFA</span>
            </p>
            <p className={styles.text_price}>-20%</p>
          </div>
          <div className={styles.right_inner}>
            <div className={styles.top_inner}>
              <div className={styles.overlay_top}>
                <img src='./images/sales/furnitures-chairs.jpg' alt='sale' />{' '}
              </div>
              <p className={styles.topSale_text}>
                <strong>OFFICE</strong> CHAIR<span> COLLECTION</span>
              </p>
              <p className={styles.topSale_text_price}>$200.00</p>
            </div>
            <div className={styles.bottom_inner}>
              <div className={styles.overlay_bottom}>
                <img src='./images/dining/dining-8.jpg' alt='sale' />
              </div>
              <p className={styles.bottomSale_text}>
                <strong>SPECIAL</strong> COLLECTION
                <span> SAVE UP 45% OF FURNITURE</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SaleBox.propTypes = {
  promotion_img: PropTypes.string,
};

export default SaleBox;

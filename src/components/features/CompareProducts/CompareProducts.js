import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './CompareProducts.module.scss';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../common/Button/Button';
import { getCompare, toggleProductCompare } from '../../../redux/productsRedux';

const CompareProducts = () => {
  const dispatch = useDispatch();
  const compare = useSelector(state => getCompare(state));

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(toggleProductCompare(id));
  };

  if (compare.length === 0) return <></>;

  return (
    <div className={'row align-items-end justify-content-center ' + styles.wrapper}>
      {compare.map(product => (
        <div className={'col-4 col-lg-1 ' + styles.box} key={product.id}>
          <Button
            variant='outline'
            className={styles.button_close}
            onClick={e => handleRemove(e, product.id)}
          >
            <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
          </Button>
          <div className={styles.photo}>
            <img
              src={product.image}
              alt={product.category + ' ' + product.name}
              className={styles.image}
            ></img>
          </div>
          <div className={styles.content}>
            <h5>{product.name}</h5>
          </div>
        </div>
      ))}
      <div className='col-12 col-lg-1 text-center mb-2 mt-3 '>
        <Button
          variant='main-orange'
          className={compare.length === 0 ? styles.button_compare : ''}
        >
          Compare
        </Button>
      </div>
    </div>
  );
};

export default CompareProducts;

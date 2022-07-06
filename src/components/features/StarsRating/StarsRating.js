import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import styles from '../StarsRating/StarsRating.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { updateRating } from '../../../redux/productsRedux';
import Button from '../../common/Button/Button';

const StarsRating = ({ id, ownStars, stars }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(0);

  const updateStars = ({ id, star, event }) => {
    event.preventDefault();
    dispatch(updateRating({ productId: id, ownStars: star }));
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map(star => (
        <Button key={star} onClick={event => updateStars({ id, star, event })}>
          <FontAwesomeIcon
            icon={star <= (hover || ownStars || stars) ? faStar : farStar}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={
              ownStars || hover === star || (hover && stars)
                ? styles.ownStars
                : styles.stars
            }
          ></FontAwesomeIcon>
        </Button>
      ))}
    </div>
  );
};

StarsRating.propTypes = {
  id: PropTypes.string,
  ownStars: PropTypes.number,
  stars: PropTypes.number,
};

export default StarsRating;

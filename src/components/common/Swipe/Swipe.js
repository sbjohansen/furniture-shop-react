import React from 'react';
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';

const Swipe = ({ children, leftAction, rightAction }) => {
  const config = {
    delta: 50, // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: true, // preventDefault on touchmove, *See Details*
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
    rotationAngle: 0, // set a rotation angle
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => leftAction(),
    onSwipedRight: () => rightAction(),
    ...config,
  });

  return <div {...handlers}>{children}</div>;
};

Swipe.propTypes = {
  children: PropTypes.node,
  leftAction: PropTypes.func,
  rightAction: PropTypes.func,
};

export default Swipe;

import React from 'react';
//import PropTypes from 'prop-types';

import styles from './Homepage.module.scss';

import FeatureBoxes from '../../features/FeatureBoxes/FeatureBoxes';
import NewFurniture from '../../features/NewFurniture/NewFurnitureContainer';
import SaleBox from '../../features/SaleBox/SaleBox';
import Feedback from '../../features/Feedback/Feedback';
import Gallery from '../../features/Gallery/Gallery';
import PromotedBox from '../../features/PromotedBox/PromotedBox';
import Brands from '../../features/Brands/Brands';

const Homepage = () => (
  <div className={styles.root}>
    <PromotedBox />
    <FeatureBoxes />
    <SaleBox />
    <NewFurniture />
    <Gallery />
    <Brands />
    <Feedback />
  </div>
);

// Homepage.propTypes = {};

export default Homepage;

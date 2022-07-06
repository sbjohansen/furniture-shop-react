import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CompareProducts from '../../features/CompareProducts/CompareProducts';

import { getScreenSize } from '../../../redux/settingsReducer';
import { useDispatch } from 'react-redux';

import { MOBILE } from '../../../settings/settings';
import { isMobile } from 'react-device-detect';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();

  if (isMobile) {
    dispatch(getScreenSize({ mediaQuery: MOBILE }));
  }

  return (
    <div>
      <Header />
      {children}
      <Footer />
      <CompareProducts />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;

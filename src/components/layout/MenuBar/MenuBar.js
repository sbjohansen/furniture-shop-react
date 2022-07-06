import React from 'react';
import PropTypes from 'prop-types';

import ProductSearch from '../../features/ProductSearch/ProductSearch';
import { Link } from 'react-router-dom';
import styles from './MenuBar.module.scss';

const MenuBar = ({ children }) => (
  <div className={styles.root}>
    <div className='container mb-5'>
      <div className={'row align-items-center text-center ' + styles.menu}>
        <div className={'col-12 col-md-5 ' + styles.searchField}>
          <ProductSearch />
        </div>
        <div className={'col-12 col-md-7 ' + styles.mobile_menu}>
          <nav className={'navbar navbar-expand-md navbar-light bg-none p-0'}>
            <div className='container-fluid'>
              <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <div className='collapse navbar-collapse navbar-mobile' id='navbarNav'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                  <li className='nav-item'>
                    <Link className={styles.active} aria-current='page' to='#'>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link className='' to='#'>
                      Furniture
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link className='' to='#'>
                      Chair
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link className='' to='#'>
                      Table
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link className='' to='#'>
                      Sofa
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link className='' to='#'>
                      Bedroom
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link
                      className='nav-link disabled'
                      to='#'
                      tabIndex='-1'
                      aria-disabled='true'
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
);

MenuBar.propTypes = {
  children: PropTypes.node,
};

export default MenuBar;

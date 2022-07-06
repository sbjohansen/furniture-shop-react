import React from 'react';
// import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faLock, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './TopBar.module.scss';

const TopBar = () => (
  <div className={styles.root}>
    <div className='container'>
      <div className='row'>
        <div className={`col text-left ${styles.topOptions}`}>
          <ul>
            <li>
              <Link to='#'>
                USD <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
              </Link>
            </li>
            <li>
              <Link to='#'>
                English <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
              </Link>
            </li>
            <li>
              <Link to='#'>
                Help <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
              </Link>
            </li>
          </ul>
        </div>
        <div className={`col text-right ${styles.topMenu}`}>
          <ul>
            <li>
              <Link to='#'>
                <FontAwesomeIcon className={styles.icon} icon={faUser} />{' '}
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <FontAwesomeIcon className={styles.icon} icon={faLock} />
                <span>Register</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <FontAwesomeIcon className={styles.icon} icon={faBars} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// TopBar.propTypes = {};

export default TopBar;

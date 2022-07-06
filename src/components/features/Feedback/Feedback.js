import React, { useState } from 'react';
import styles from './Feedback.module.scss';
import { getAllFeedback, getFeedbackCount } from '../../../redux/feedbackRedux';
import { useSelector } from 'react-redux';
import Swipe from '../../common/Swipe/Swipe';
import { Link } from 'react-router-dom';

const Feedback = () => {
  const [activePage, setActivePage] = useState(0);

  const feedbackData = useSelector(getAllFeedback);
  const pagesCount = useSelector(getFeedbackCount);

  const handlePageChange = newPage => {
    setActivePage(newPage);
  };

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

  //placeholder for Swipe functionality
  const rightAction = () => {
    setActivePage(activePage - 1);

    if (activePage <= 0) {
      setActivePage(activePage);
    }
  };

  const leftAction = () => {
    setActivePage(activePage + 1);

    if (activePage >= pagesCount - 1) {
      setActivePage(activePage);
    }
  };

  return (
    <Swipe leftAction={leftAction} rightAction={rightAction}>
      <div className={styles.root}>
        <div className='container'>
          <div className={styles.panelBar}>
            <div className='row no-gutters align-items-end'>
              <div className={'col-auto ' + styles.heading}>
                <h3>Client Feedback</h3>
              </div>
              <div className='col'></div>
              <div className={'col-auto ' + styles.dots}>
                <ul>{dots}</ul>
              </div>
            </div>
          </div>
          <div className='row justify-content-center'>
            <span className={'font-secular ' + styles.apostrophe}> &apos;&apos;</span>
          </div>
          {feedbackData.slice(activePage, activePage + 1).map(item => (
            <div key={item.id}>
              <div className='row justify-content-center'>
                <div className='col-10'>
                  <div className={styles.feedbackContent}>{item.content}</div>
                </div>
              </div>
              <div className={styles.feedbackAuthorWrapper}>
                <div className='row justify-content-center'>
                  <div className='col-2'>
                    <div className={styles.authorBox}>
                      <img src={item.photo} alt='apostrophe' />
                    </div>
                  </div>
                  <div className='col-2'>
                    <div className='row'>
                      <div className={styles.feedbackAuthorText}> {item.author} </div>
                    </div>
                    <div className='row'>
                      <div className={styles.feedbackAuthorTitle}>
                        {item.authorTitle}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Swipe>
  );
};

export default Feedback;

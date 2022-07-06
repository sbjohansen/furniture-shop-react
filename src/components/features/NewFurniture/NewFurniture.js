import React from 'react';
import PropTypes from 'prop-types';

import styles from './NewFurniture.module.scss';
import ProductBox from '../../common/ProductBox/ProductBox';
import Swipe from '../../common/Swipe/Swipe';
import { Link } from 'react-router-dom';

class NewFurniture extends React.Component {
  state = {
    activePage: 0,
    activeCategory: 'bed',
    activeFade: false,
  };

  handlePageChange(newPage) {
    this.setState({
      activePage: newPage,
      activeFade: true,
    });
    if (this.state.activeFade === false) {
      setTimeout(
        function() {
          this.setState({ activeFade: false });
        }.bind(this),
        250
      );
    }
  }

  handleCategoryChange(newCategory) {
    this.setState({
      activeFade: true,
    });

    setTimeout(() => {
      this.setState({
        activeCategory: newCategory,
      });
    }, 250);

    if (this.state.activeFade === false) {
      setTimeout(
        function() {
          this.setState({ activeFade: false });
        }.bind(this),
        250
      );
    }
  }

  render() {
    const { categories, products } = this.props;
    const { activeCategory, activePage, activeFade } = this.state;

    const categoryProducts = products.filter(item => item.category === activeCategory);
    const pagesCount = Math.ceil(categoryProducts.length / 8);

    const dots = [];
    for (let i = 0; i < pagesCount; i++) {
      dots.push(
        <li key={i}>
          <Link
            to='#'
            onClick={() => this.handlePageChange(i)}
            className={i === activePage ? styles.active : ''}
          >
            page {i}
          </Link>
        </li>
      );
    }

    const rightAction = () => {
      this.setState({ activePage: activePage - 1 });

      if (activePage <= 0) {
        this.setState({ activePage: activePage });
      }
    };

    const leftAction = () => {
      this.setState({ activePage: activePage + 1 });

      if (activePage >= pagesCount - 1) {
        this.setState({ activePage: activePage });
      }
    };

    return (
      <Swipe leftAction={leftAction} rightAction={rightAction}>
        <div className={styles.root}>
          <div className='container'>
            <div className={styles.panelBar}>
              <div className='row no-gutters align-items-end'>
                <div className={'col-auto ' + styles.heading}>
                  <h3>New furniture</h3>
                </div>
                <div className={'col ' + styles.menu}>
                  <ul>
                    {categories.map(item => (
                      <li key={item.id}>
                        <Link
                          to='#'
                          className={item.id === activeCategory ? styles.active : ''}
                          onClick={() => this.handleCategoryChange(item.id)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={'col-auto ' + styles.dots}>
                  <ul>{dots}</ul>
                </div>
              </div>
            </div>
            <div
              className={`row ${styles.row} ${
                activeFade ? styles.fadeIn : styles.fadeOut
              }`}
            >
              {categoryProducts
                .slice(activePage * 8, (activePage + 1) * 8)
                .map(item => (
                  <div key={item.id} className='col-12 col-md-6 col-lg-3'>
                    <ProductBox {...item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Swipe>
    );
  }
}

NewFurniture.propTypes = {
  children: PropTypes.node,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
      stars: PropTypes.number,
      promo: PropTypes.string,
      newFurniture: PropTypes.bool,
      isFavorite: PropTypes.bool,
      compare: PropTypes.bool,
      priceOld: PropTypes.number,
    })
  ),
  activeFade: PropTypes.bool,
};

NewFurniture.defaultProps = {
  categories: [],
  products: [],
};

export default NewFurniture;

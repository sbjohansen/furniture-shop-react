/* selectors */
export const getAll = ({ products }) => products;
export const getCount = ({ products }) => products.length;

export const getIsFavorite = ({ products }) =>
  products.filter(product => product.isFavorite === true);
export const getHotDeals = ({ products }) =>
  products.filter(product => product.hotDeal === true);
export const getProductById = ({ products }, productId) =>
  products.find(product => product.id === productId);
export const getCompare = ({ products }) =>
  products.filter(product => product.compare === true);
export const getNew = ({ products }) =>
  products.filter(item => item.newFurniture === true);
export const getPromo = ({ promo }) => promo;

/* actions */
const createActionName = actionName => `app/products/${actionName}`;
const TOGGLE_PRODUCT_FAVORITE = createActionName('TOGGLE_PRODUCT_FAVORITE');
const UPDATE_REVIEW = createActionName('UPDATE_REVIEW');
const TOGGLE_PRODUCT_COMPARE = createActionName('TOGGLE_PRODUCT_COMPARE');

/* action creators */
export const toggleFavoriteProduct = payload => ({
  type: TOGGLE_PRODUCT_FAVORITE,
  payload,
});

export const updateRating = payload => ({
  type: UPDATE_REVIEW,
  payload,
});

//functions
const addRating = (state, action) => {
  return state.map(product => {
    if (product.id !== action.payload.productId) {
      return product;
    }
    return {
      ...product,
      ownStars: action.payload.ownStars,
    };
  });
};

export const toggleProductCompare = payload => ({
  type: TOGGLE_PRODUCT_COMPARE,
  payload,
});

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case TOGGLE_PRODUCT_FAVORITE:
      return statePart.map(product =>
        product.id === action.payload
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      );
    case UPDATE_REVIEW: {
      return addRating(statePart, action);
    }
    case TOGGLE_PRODUCT_COMPARE:
      return statePart.map(product =>
        product.id === action.payload
          ? { ...product, compare: !product.compare }
          : product
      );
    default:
      return statePart;
  }
}

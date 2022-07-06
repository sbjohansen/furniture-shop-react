/* selectors */
export const getMediaQuery = ({ settings }) => settings.mediaQuery;

/* action name creator */
const reducerName = 'settings';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const GET_MEDIAQUERY = createActionName('GET_MEDIAQUERY');

/* action creators */
export const getScreenSize = payload => ({ payload, type: GET_MEDIAQUERY });

//functions

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case GET_MEDIAQUERY: {
      return statePart.mediaQuery !== action.payload.mediaQuery
        ? { ...statePart, ...action.payload }
        : statePart;
    }
    default:
      return statePart;
  }
}

/* selectors */
export const getAllFeedback = ({ feedback }) => feedback;
export const getFeedbackCount = ({ feedback }) => feedback.length;

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}

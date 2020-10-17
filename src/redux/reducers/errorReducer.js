import { SET_ERROR } from '../types';

const initialState = {
  message: '',
  statusCode: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      console.log(action);
      return {
        ...state,
        message: action.payload.message,
        statusCode: action.payload.statusCode
      };
    default:
      return state;
  }
};

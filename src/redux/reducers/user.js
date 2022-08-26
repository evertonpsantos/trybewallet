import { ADD_USER } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INIT_STATE = {
  email: '',
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.email,
    };

  default:
    return state;
  }
};

export default userReducer;

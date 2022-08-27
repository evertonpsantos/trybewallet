import { ADD_EXPENSE, GET_CURRENCY } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INIT_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: action.data,
    };

  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses,
        { id: state.expenses.length,
          value: action.valueInput,
          description: action.descriptionInput,
          currensy: action.currensyInput,
          method: action.methodInput,
          tag: action.tagInput,
          exchangeRates: action.exchangeRates,
        }],
    };

  default:
    return state;
  }
};

export default walletReducer;

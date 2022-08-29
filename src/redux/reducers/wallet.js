import { ADD_EXPENSE, DELETE_EXPENSE, GET_CURRENCY } from '../actions';

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
        {
          value: action.valueInput,
          currency: action.currensyInput,
          method: action.methodInput,
          tag: action.tagInput,
          description: action.descriptionInput,
          id: state.expenses.length,
          exchangeRates: action.exchangeRates,
        }],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };

  default:
    return state;
  }
};

export default walletReducer;

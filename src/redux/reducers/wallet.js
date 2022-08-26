// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INIT_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default walletReducer;

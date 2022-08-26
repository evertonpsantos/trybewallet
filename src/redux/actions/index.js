// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const GET_CURRENCY = 'GET_CURRENCY';

export const saveUser = (email) => ({
  type: ADD_USER,
  email,
});

const sendCurrency = (data) => ({
  type: GET_CURRENCY,
  data,
});

export const getCurrency = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const newList = Object.keys(data);
  const filteredList = newList.filter((curr) => curr !== 'USDT');
  dispatch(sendCurrency(filteredList));
};

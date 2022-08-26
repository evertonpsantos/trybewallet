// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';

export const saveUser = (email) => ({
  type: ADD_USER,
  email,
});

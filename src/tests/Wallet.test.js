import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import testInitialState from './helpers/TestInitialState';

describe('Tests if Wallet page', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, testInitialState);
    const button = screen.getByRole('button', { name: /Entrar/i });
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    userEvent.type(emailInput, 'testing@test.com');
    userEvent.type(passwordInput, 'testPassword');
    userEvent.click(button);
  });

  it('Calls fetch on load', async () => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  it('Shows user\'\'s email', () => {
    const userEmail = screen.getByText(/testing@test.com/i);
    expect(userEmail).toBeInTheDocument();
  });

  it('Is able to type on the fields', () => {
    const valueInput = screen.getByLabelText(/Valor/i);
    expect(valueInput).toBeInTheDocument();
    userEvent.type(valueInput, '10');
    expect(valueInput.value).toBe('10');
  });

  it('Starts with 0 BRL', () => {
    const totalValue = screen.getByTestId('total-field');
    expect(totalValue).toBeInTheDocument();
  });

  it('Is possible to add an expense', async () => {
    const valueInput = screen.getByLabelText(/Valor/i);
    userEvent.type(valueInput, '111');
    const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    await userEvent.click(addButton);
    expect(global.fetch).toHaveBeenCalled();
    // const deleteButton = screen.getByRole('button', { name: /Excluir/i });
    // expect(deleteButton).toBeInTheDocument();
  });
});

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

  it('Is possible to add and delete an expense', async () => {
    const valueInput = screen.getByLabelText(/Valor/i);
    userEvent.type(valueInput, '111');
    const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(addButton);
    expect(global.fetch).toHaveBeenCalled();
    const valueField = await screen.findByText('111.00');
    expect(valueField).toBeInTheDocument();
    const deleteButton = await screen.findByRole('button', { name: /Excluir/i });
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);
    expect(valueField).not.toBeInTheDocument();
  });

  it('Is possible do edit an expense', async () => {
    const valueInput = screen.getByLabelText(/Valor/i);
    userEvent.type(valueInput, '111');
    const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(addButton);
    const editButton = await screen.findByRole('button', { name: /Editar/i });
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);
    userEvent.type(valueInput, '10');
    const editExpense = screen.getByRole('button', { name: /Editar despesa/i });
    userEvent.click(editExpense);
    const newValue = await screen.findByText('10.00');
    expect(newValue).toBeInTheDocument();
  });
});

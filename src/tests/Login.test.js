import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Tests if Login page', () => {
  it('Have an email and name input onload', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Typing is possible on both fields', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const testEmail = 'test@test.com';
    const testPassword = 'albatroz';
    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);
    expect(emailInput.value).toBe(testEmail);
    expect(passwordInput.value).toBe(testPassword);
  });

  it('Button can be enabled', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const testEmail = 'test@test.com';
    const testPassword = 'albatroz';
    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);
    expect(button).toBeEnabled();
  });

  it('Goes to a new route clicking the button', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /Entrar/i });
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    userEvent.type(emailInput, 'testing@test.com');
    userEvent.type(passwordInput, 'testPassword');
    userEvent.click(button);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});

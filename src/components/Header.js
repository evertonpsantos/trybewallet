import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUser } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  validateEmail = (email) => {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regexEmail.test(email);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const MINIMAL_CHARS = 5;
      if (this.validateEmail(email) && password.length > MINIMAL_CHARS) {
        return this.setState({ isDisabled: false });
      }
      this.setState({ isDisabled: true });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history: { push } } = this.props;
    const { email } = this.state;
    dispatch(saveUser(email));
    push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <>
        <div>Header</div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="email-input">
            E-mail:
            <input
              type="email"
              data-testid="email-input"
              id="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password-input">
            Senha:
            <input
              type="password"
              data-testid="password-input"
              id="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button type="submit" disabled={ isDisabled }>Entrar</button>
        </form>
      </>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Header);

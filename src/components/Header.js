import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    const { expenses } = this.props;

    const total = expenses.reduce((acc, curr) => {
      const sum = curr.value * curr.exchangeRates[curr.currency].ask;
      return acc + sum;
    }, 0);

    return (
      <header>
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <span
          data-testid="total-field"
        >
          {!expenses ? 0 : total.toFixed(2)}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses || 0,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);

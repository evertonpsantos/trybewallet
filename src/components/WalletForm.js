import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrency, getExchangeRate, handleEditExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      valueInput: '',
      descriptionInput: '',
      currensyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrency());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addExpense = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(getExchangeRate(this.state));
    this.setState({ valueInput: '', descriptionInput: '' });
  };

  handleEdit = (event) => {
    event.preventDefault();
    const { dispatch, editId } = this.props;
    dispatch(handleEditExpense(this.state, editId));
    this.setState({ valueInput: '', descriptionInput: '' });
  };

  render() {
    const { currencies, editor } = this.props;
    const { currensyInput, valueInput,
      descriptionInput, methodInput, tagInput } = this.state;

    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            id="value-input"
            name="valueInput"
            value={ valueInput }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
            name="currensyInput"
            value={ currensyInput }
            onChange={ this.handleChange }
          >
            {currencies
              .map((cur) => <option value={ cur } key={ cur }>{cur}</option>)}
          </select>
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            data-testid="description-input"
            id="description-input"
            name="descriptionInput"
            value={ descriptionInput }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method-input"
            name="methodInput"
            value={ methodInput }
            onChange={ this.handleChange }
          >
            <option
              value="Dinheiro"
              id="cash-method"
            >
              Dinheiro
            </option>
            <option
              value="Cartão de crédito"
              id="credit-card-method"
            >
              Cartão de crédito
            </option>
            <option
              value="Cartão de débito"
              id="debit-card-method"
            >
              Cartão de débito
            </option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tagInput"
            value={ tagInput }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {!editor
        && <button type="submit" onClick={ this.addExpense }>Adicionar despesa</button>}
        {editor
        && <button type="submit" onClick={ this.handleEdit }>Editar despesa</button>}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  editId: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  editId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);

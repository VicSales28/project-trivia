import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveToken } from '../helpers/localStorage';
import logo from '../trivia.png';
import { saveProfileGlobal } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  verifyState = () => {
    const { name, email } = this.state;
    this.setState({
      isDisabled: !((name.length > 0 && email.length > 0)),
    });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState(() => ({
      [name]: value,
    }), this.verifyState);
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const token = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
    dispatch(saveProfileGlobal(name, email));
    saveToken(token.token);
    history.push('/game');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    const { history } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <input
            onChange={ this.handleChange }
            data-testid="input-player-name"
            name="name"
            value={ name }
            type="text"
            placeholder="Digite seu nome"
          />
          <input
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            type="email"
            placeholder="Digite seu email"
          />

          <button
            onClick={ this.handleClick }
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;
export default connect(null)(Login);

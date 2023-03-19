import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { saveToken } from '../helpers/localStorage';
import logo from '../trivia.png';

export default class Login extends Component {
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
    const { history } = this.props;
    const token = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
    saveToken(token.token);
    history.push('/game');
  };

  render() {
    const { name, email, isDisabled } = this.state;

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
          />
          <input
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            type="email"
          />

          <button
            onClick={ this.handleClick }
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;

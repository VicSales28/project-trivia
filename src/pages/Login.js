// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import logo from '../trivia.png';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  verifyState = () => {
    const { name, email } = this.state;
    // if (name.length > 0 && email.length > 0) {
    //   this.setState({ isDisabled: false });
    // }
    this.setState({
      isDisabled: !((name.length > 0 && email.length > 0)),
    });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState(() => ({
      [name]: value,
    }), this.verifyState);
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

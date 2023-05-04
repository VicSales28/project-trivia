import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveToken } from '../helpers/localStorage';
import { saveProfileGlobal } from '../redux/actions';
import triviaMaster from '../styles/images/trivia-master.png';
import '../styles/pages/Login.css';

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
      <div className="login-container">
        <main>
          <img src={ triviaMaster } className="App-logo" alt="Trivia Master" />
          <h1>Login</h1>
          <input
            onChange={ this.handleChange }
            data-testid="input-player-name"
            name="name"
            value={ name }
            type="text"
            placeholder="Type your username"
          />
          <input
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            type="email"
            placeholder="Type your e-mail"
          />

          <div className="btns-container">
            <button
              onClick={ this.handleClick }
              data-testid="btn-play"
              disabled={ isDisabled }
              className="play-btn"
            >
              Play
            </button>
            <button
              type="button"
              onClick={ () => history.push('/ranking') }
              className="settings-btn"
            >
              Ranking
            </button>
          </div>

        </main>
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

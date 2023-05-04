import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import triviaMaster from '../styles/images/trivia-master.png';
import '../styles/components/Header.css';

class Header extends Component {
  render() {
    const {
      gravatarEmail,
      name,
      score,
    } = this.props;
    const playerHash = md5(gravatarEmail).toString();
    return (
      <header>

        <div htmlFor="header-player" className="header-player">
          <img
            src={ `https://www.gravatar.com/avatar/${playerHash}` }
            data-testid="header-profile-picture"
            className="img-gravatar"
            alt="profile"
          />
          <div className="player-data">
            <h1 data-testid="header-player-name" className="name">{`Player: ${name}`}</h1>
            <h1 data-testid="header-score" className="score">{`Score: ${score}`}</h1>
          </div>
        </div>

        <img src={ triviaMaster } className="App-logo" alt="Trivia Master" />

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  expenses: state.player.expenses,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);

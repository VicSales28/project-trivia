import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetProfile } from '../redux/actions';

import triviaMaster from '../styles/images/trivia-master.png';
import '../styles/pages/Ranking.css';

class Ranking extends Component {
  savedRanking = JSON.parse(localStorage.getItem('ranking')) || [];

  handleClick = () => {
    const { history, dispatch } = this.props;

    dispatch(resetProfile());
    history.push('/');
  };

  render() {
    return (
      <div className="ranking-container">

        <div className="ranking-header">
          <img src={ triviaMaster } className="App-logo" alt="Trivia Master" />
          <h1 data-testid="ranking-title">RANKING</h1>
        </div>

        {this.savedRanking
          .sort((a, b) => b.score - a.score)
          .map((user, index) => (

            <div className="ranking-card" key={ index }>

              <div className="ranking-user">
                <img src={ user.image } alt="img-gravatar" />
                <h2
                  data-testid={ `player-name-${index}` }
                >
                  { user.name }
                </h2>
              </div>

              <h3
                data-testid={ `player-score-${index}` }
              >
                { user.score }
              </h3>

            </div>

          ))}

        <button
          data-testid="btn-go-home"
          onClick={ this.handleClick }
          className="play-again-btn"
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null)(Ranking);

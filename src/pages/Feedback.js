import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import Header from '../components/Header';
import { resetProfile } from '../redux/actions';
import '../styles/pages/Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    this.saveRanking();
  }

  saveRanking = () => {
    const { name, score, gravatarEmail } = this.props;
    const playerHash = md5(gravatarEmail).toString();
    const image = `https://www.gravatar.com/avatar/${playerHash}`;
    const newPerformance = { image, name, score };
    const rankingList = JSON.parse(localStorage.getItem('ranking')) || [];
    const newRankingList = JSON.stringify([...rankingList, newPerformance]);
    localStorage.setItem('ranking', newRankingList);
  };

  handleClick = () => {
    const { history, dispatch } = this.props;

    dispatch(resetProfile());
    history.push('/');
  };

  render() {
    const { history, assertions, score } = this.props;
    return (
      <>
        <Header />
        <div className="feedback-container">
          <p data-testid="feedback-total-score">
            Score:
            {Number(score)}
          </p>
          <p data-testid="feedback-total-question">
            Assertions:
            {Number(assertions)}
          </p>

          <p
            data-testid="feedback-text"
          >
            {assertions > 2 ? 'Well Done!' : 'Could be better...' }
          </p>
          <div className="btns-container">
            <button
              data-testid="btn-play-again"
              className="play-again-btn"
              onClick={ this.handleClick }
            >
              Play Again
            </button>
            <button
              data-testid="btn-ranking"
              className="ranking-btn"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);

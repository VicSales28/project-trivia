import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetProfile } from '../redux/actions';

class Feedback extends Component {
  handleClick = () => {
    const { history, dispatch } = this.props;

    dispatch(resetProfile());
    history.push('/');
  };

  render() {
    const { history, assertions, score } = this.props;
    return (
      <div>
        <Header />
        <section>
          <div data-testid="feedback-total-score">{Number(score)}</div>
          <div data-testid="feedback-total-question">{Number(assertions)}</div>
        </section>
        <div
          data-testid="feedback-text"
        >
          {assertions > 2 ? 'Well Done!' : 'Could be better...' }
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);

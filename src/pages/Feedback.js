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
    const { history, assertions } = this.props;
    return (
      <div>
        <Header />
        <div
          data-testid="feedback-text"
        >
          {assertions.length > 2 ? 'Well Done!' : 'Could be better...' }
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
});

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);

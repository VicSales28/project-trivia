import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from '../components/QuestionCard';

import { getToken, saveProfile } from '../helpers/localStorage';

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30000;

class Game extends Component {
  state = {
    questions: [''],
    questionIndex: 0,
    countdown: 30,
    isDisabled: false,
    nextHidden: true,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = getToken();
    const questions = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();

    if (questions.response_code !== 0) {
      saveProfile('', '', '', '');
      history.push('/');
    } else {
      this.setState({
        questions,
      });
    }

    const timer = setInterval(() => {
      this.setState((prevState) => ({
        countdown: prevState.countdown - 1,
      }));
    }, ONE_SECOND);

    setTimeout(() => {
      clearInterval(timer);
      this.setState({
        isDisabled: true,
      });
    }, THIRTY_SECONDS);
  }

  showNextButton = () => {
    this.setState({
      nextHidden: false,
    });
  };

  render() {
    const { questionIndex,
      questions: { results },
      nextHidden,
      countdown,
      isDisabled } = this.state;
    return (
      <div>
        <h1>Responda</h1>
        <h3>{ countdown }</h3>
        {results && (
          <QuestionCard
            questions={ results[questionIndex] }
            showNextButton={ this.showNextButton }
            isDisabled={ isDisabled }
          />)}
        {!nextHidden && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.showNextButton }
            hidden={ nextHidden }
          >
            Next
          </button>) }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;

export default Game;

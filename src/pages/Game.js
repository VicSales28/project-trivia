import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from '../components/QuestionCard';

import { getToken, saveProfile } from '../helpers/localStorage';

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30000;

class Game extends Component {
  state = {
    questions: [''],
    answers: [],
    questionIndex: 0,
    countdown: 30,
    isDisabled: false,
    nextHidden: true,
    rightAnswerClass: '',
    wrongAnswerClass: '',
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
      }, this.sortingQuestions);
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

  sortingQuestions = () => {
    const { questions: { results }, questionIndex } = this.state;
    const answers = [
      ...results[questionIndex].incorrect_answers, results[questionIndex].correct_answer];

    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    this.setState({
      answers,
    });
  };

  answerButton = () => {
    this.setState({
      rightAnswerClass: 'rightAnswer',
      wrongAnswerClass: 'wrongAnswer',
      nextHidden: false,
    });
  };

  nextQuestion = () => {
    this.setState((state) => ({
      questionIndex: state.questionIndex + 1,
      nextHidden: true,
      rightAnswerClass: '',
      wrongAnswerClass: '',
      countdown: 30,
    }), this.sortingQuestions);
  };

  render() {
    const { questionIndex,
      questions: { results },
      answers,
      rightAnswerClass,
      wrongAnswerClass,
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
            answers={ answers }
            rightAnswer={ rightAnswerClass }
            wrongAnswer={ wrongAnswerClass }
            answerButton={ this.answerButton }
          />)}
        {!nextHidden && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
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

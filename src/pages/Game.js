import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';
import Header from '../components/Header';

import { getToken, saveProfile } from '../helpers/localStorage';
import { assertionPlayer, scorePlayer } from '../redux/actions/index';

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30000;
let timeout = null;
let timer = null;

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

    timer = setInterval(() => {
      this.setState((prevState) => ({
        countdown: prevState.countdown - 1,
      }));
    }, ONE_SECOND);

    timeout = setTimeout(() => {
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

  handleAnswersBtns = () => {
    this.setState({
      rightAnswerClass: 'rightAnswer',
      wrongAnswerClass: 'wrongAnswer',
      nextHidden: false,
    });
  };

  handleSelectAnswer = ({ target }) => {
    const {
      questionIndex,
      questions: { results },
    } = this.state;
    const { dispatch } = this.props;
    const { correct_answer: correctAnswer } = results[questionIndex];

    clearInterval(timer);
    this.handleAnswersBtns();

    const answer = target.innerText;
    if (answer === correctAnswer) { dispatch(assertionPlayer(1)); }
    return (answer === correctAnswer)
      ? dispatch(scorePlayer(this.getScore()))
      : dispatch(scorePlayer(0));
  };

  getScore = () => {
    const { questionIndex, questions: { results }, countdown } = this.state;
    let multiplier = 1;
    const hardMultiplier = 3;
    const mediumMultiplier = 2;
    const basePoints = 10;

    if (results[questionIndex].difficulty === 'hard') multiplier = hardMultiplier;
    if (results[questionIndex].difficulty === 'medium') multiplier = mediumMultiplier;

    return (basePoints + (countdown * multiplier));
  };

  nextQuestion = () => {
    const { history } = this.props;
    const { questionIndex, answers } = this.state;
    if (questionIndex >= answers.length) history.push('/feedback');

    this.setState((state) => ({
      questionIndex: state.questionIndex + 1,
      nextHidden: true,
      rightAnswerClass: '',
      wrongAnswerClass: '',
      countdown: 30,
    }), this.sortingQuestions);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      clearInterval(timer);
      this.setState({
        isDisabled: true,
      });
    }, THIRTY_SECONDS);
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
        <Header />
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
            answerButton={ (event) => this.handleSelectAnswer(event) }
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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;

export default connect(null)(Game);

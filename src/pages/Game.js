import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from '../components/QuestionCard';

import { getToken, saveProfile } from '../helpers/localStorage';

class Game extends Component {
  state = {
    questions: [''],
    questionIndex: 0,
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
  }

  render() {
    const { questionIndex, questions: { results } } = this.state;
    return (
      <div>
        <h1>Responda</h1>
        {results && <QuestionCard questions={ results[questionIndex] } />}
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

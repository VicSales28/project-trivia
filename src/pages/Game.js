import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from '../components/QuestionCard';

import { getToken, saveProfile } from '../helpers/localStorage';

class Game extends Component {
  state = {
    questions: [''],
    questionIndex: 0,
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
  }

  showNextButton = () => {
    this.setState({
      nextHidden: false,
    });
  };

  render() {
    const { questionIndex, questions: { results }, nextHidden } = this.state;
    return (
      <div>
        <h1>Responda</h1>
        {results && (
          <QuestionCard
            questions={ results[questionIndex] }
            showNextButton={ this.showNextButton }
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

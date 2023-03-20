import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  state = {
    answers: [],
    rightAnswerClass: '',
    wrongAnswerClass: '',
  };

  componentDidMount() {
    const { questions } = this.props;
    const answers = [...questions.incorrect_answers, questions.correct_answer];

    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    this.setState({
      answers,
    });
  }

  answerButton = () => {
    const { showNextButton } = this.props;

    this.setState({
      rightAnswerClass: 'rightAnswer',
      wrongAnswerClass: 'wrongAnswer',
    });
    showNextButton();
  };

  render() {
    const { answers, rightAnswerClass, wrongAnswerClass } = this.state;
    const { questions } = this.props;
    let wrongIndex = 0;
    return (
      <div>
        <h3 data-testid="question-category">{ questions.category }</h3>
        <h2 data-testid="question-text">{ questions.question }</h2>
        <div data-testid="answer-options">
          {answers.reduce((acc, curr, i) => {
            if (curr === questions.correct_answer) {
              acc.push(
                <button
                  type="button"
                  className={ rightAnswerClass }
                  onClick={ this.answerButton }
                  key={ i }
                  value="correct-answer"
                  data-testid="correct-answer"
                >
                  {curr}
                </button>,
              );
            } else {
              acc.push(
                <button
                  type="button"
                  className={ wrongAnswerClass }
                  onClick={ this.answerButton }
                  key={ i }
                  value={ `wrong-answer-${wrongIndex}` }
                  data-testid={ `wrong-answer-${wrongIndex}` }
                >
                  {curr}
                </button>,
              );
              wrongIndex += 1;
            }
            return acc;
          }, [])}
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  questions: PropTypes.object,
}.isRequired;

export default QuestionCard;

// como vem:
// {
//   "response_code":0,
//   "results":[
//       {
//         "category":"Entertainment: Video Games",
//         "type":"multiple",
//         "difficulty":"easy",
//         "question":"What is the first weapon you acquire in Half-Life?",
//         "correct_answer":"A crowbar",
//         "incorrect_answers":[
//             "A pistol",
//             "The H.E.V suit",
//             "Your fists"
//         ]
//       }
//   ]
// }

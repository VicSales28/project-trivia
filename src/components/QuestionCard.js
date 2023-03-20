import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  // state = {
  //   rightAnswerClass: '',
  //   wrongAnswerClass: '',
  // };

  // answerButton = () => {
  //   const { showNextButton } = this.props;

  //   this.setState({
  //     rightAnswerClass: 'rightAnswer',
  //     wrongAnswerClass: 'wrongAnswer',
  //   });
  //   showNextButton();
  // };

  render() {
    const { questions, isDisabled, answers, rightAnswer,
      wrongAnswer, answerButton } = this.props;
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
                  className={ rightAnswer }
                  onClick={ answerButton }
                  key={ i }
                  value="correct-answer"
                  data-testid="correct-answer"
                  disabled={ isDisabled }
                >
                  {curr}
                </button>,
              );
            } else {
              acc.push(
                <button
                  type="button"
                  className={ wrongAnswer }
                  onClick={ answerButton }
                  key={ i }
                  value={ `wrong-answer-${wrongIndex}` }
                  data-testid={ `wrong-answer-${wrongIndex}` }
                  disabled={ isDisabled }
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
  isDisabled: PropTypes.bool,
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

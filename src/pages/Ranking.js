import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetProfile } from '../redux/actions';

class Ranking extends Component {
  savedRanking = JSON.parse(localStorage.getItem('ranking')) || [];

  handleClick = () => {
    const { history, dispatch } = this.props;

    dispatch(resetProfile());
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        {this.savedRanking
          .sort((a, b) => b.score - a.score)
          .map((user, index) => (

            <div key={ index }>

              <header>
                <img src={ user.image } alt="img-gravatar" />
                <h2
                  data-testid={ `player-name-${index}` }
                >
                  { user.name }
                </h2>
              </header>

              <h3
                data-testid={ `player-score-${index}` }
              >
                { user.score }
              </h3>

            </div>

          ))}

        <button
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Página Inicial
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null)(Ranking);

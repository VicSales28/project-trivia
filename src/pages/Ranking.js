import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Página Inicial
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;

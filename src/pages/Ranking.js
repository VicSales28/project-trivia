import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetProfile } from '../redux/actions';

class Ranking extends Component {
  handleClick = () => {
    const { history, dispatch } = this.props;

    dispatch(resetProfile());
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
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

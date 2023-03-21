import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const {
      gravatarEmail,
      name,
      score,
    } = this.props;
    const playerHash = md5(gravatarEmail).toString();
    return (
      <header>
        <div htmlFor="header_area">
          <img
            src={ `https://www.gravatar.com/avatar/${playerHash}` }
            data-testid="header-profile-picture"
            alt="profile"
          />
          <p
            data-testid="header-player-name"
          >
            { name }
          </p>
          <p data-testid="header-score">
            { score }
          </p>
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  expenses: state.player.expenses,
});
Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(Header);

<<<<<<< HEAD
import React, {Component} from "react";
=======
import React, { Component } from "react";
import PropTypes from "prop-types";
>>>>>>> 6557a1f9f2d001d53bcaf17d1ddc096d958e3edd

import Card from "./../components/Card";
import CardPropType from "./../propTypes/CardPropType";

class CardContainer extends Component {
<<<<<<< HEAD
  state = {
    flipped: false
  };

  flip = () => {
    this.setState(prevState => {
      return {
        flipped: !prevState.flipped
      };
    });
  };

=======
>>>>>>> 6557a1f9f2d001d53bcaf17d1ddc096d958e3edd
  handleClick = () => {
    this.props.onClick();
  };

  render() {
<<<<<<< HEAD
    return <Card flipped={this.state.flipped} onClick={this.handleClick}/>;
=======
    return (
      <Card flipped={this.props.card.flipped} onClick={this.handleClick} />
    );
>>>>>>> 6557a1f9f2d001d53bcaf17d1ddc096d958e3edd
  }
}

CardContainer.propTypes = {
  card: CardPropType.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CardContainer;

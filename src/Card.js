import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <img className="Card" src={this.props.image} all={this.props.name} />
    );
  }
}

export default Card;

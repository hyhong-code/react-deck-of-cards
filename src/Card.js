import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    const angle = Math.random() * 90 - 45;
    const xPos = Math.random() * 40 - 20;
    const yPos = Math.random() * 40 - 20;
    const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    return (
      <img
        style={{ transform: transform }}
        className="Card"
        src={this.props.image}
        all={this.props.name}
      />
    );
  }
}

export default Card;

import React, { Component } from "react";
import Card from "./Card";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const resp = await fetch(`${API_BASE_URL}new/shuffle`);
    const deck = await resp.json();
    console.log(deck);
    this.setState({ deck });
  }

  async handleClick() {
    try {
      const deckId = this.state.deck.deck_id;
      const resp = await fetch(`${API_BASE_URL}${deckId}/draw/`);
      const deck = await resp.json();
      if (!deck.success) {
        throw new Error("No cards remaining!");
      }
      console.log(deck);
      const { code, image, suit, value } = deck.cards[0];
      this.setState((ps) => ({
        drawn: [...ps.drawn, { code, image, name: `${value} of ${suit}` }],
      }));
    } catch (error) {
      alert(error);
    }
  }

  renderCards() {
    return this.state.drawn.map((card) => (
      <Card name={card.name} image={card.image} />
    ));
  }

  render() {
    return (
      <div>
        <h1>Card Dealer</h1>
        <button onClick={this.handleClick}>GIMMME A CARD!</button>
        <div>{this.renderCards()}</div>
      </div>
    );
  }
}

export default Deck;

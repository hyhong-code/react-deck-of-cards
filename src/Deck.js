import React, { Component } from "react";
import Card from "./Card";
import "./Deck.css";

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
      <Card key={card.code} name={card.name} image={card.image} />
    ));
  }

  render() {
    return (
      <div className="Deck">
        <h1 className="Deck-title">❖ Card Dealer ❖</h1>
        <h2 className="Deck-title subtitle">❖ Made with React ❖</h2>
        <button className="Deck-btn" onClick={this.handleClick}>
          GIMMME A CARD!
        </button>
        <div className="Deck-cardarea">{this.renderCards()}</div>
      </div>
    );
  }
}

export default Deck;

import React, { Component } from "react";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deckId: "", cards: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const resp = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle`);
    const { deck_id: deckId } = await resp.json();
    this.setState({ deckId });
  }

  async handleClick() {
    console.log("clicked");
    const resp = await fetch(
      `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/.`
    );
    const {
      cards: [{ image }],
    } = await resp.json();
    this.setState((ps) => ({ cards: [...ps.cards, image] }));
  }

  renderCards() {
    return this.state.cards.map((card) => <img src={card} />);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>GIMME A CARD</button>
        <div>{this.renderCards()}</div>
      </div>
    );
  }
}

export default Deck;

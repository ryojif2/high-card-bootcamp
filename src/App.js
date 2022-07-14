import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      //set default current winner as empty when first rendered.
      currWinner: "",
      winner1Count: 0,
      winner2Count: 0,
      numberOfRound: 0,
      finalWinner: "",
      nameButton: "Deal",
    };
  }

  dealCards = () => {
    if (this.state.numberOfRound === 26) {
      this.setState({
        currWinner: "",
        winner1Count: 0,
        winner2Count: 0,
        numberOfRound: 0,
        finalWinner: "",
        nameButton: "Deal",
        // currCards: [], <<< DONT NEED TO RESET THIS BECAUSE IT DOESNT MATTER. Below Set state will over write the 26th set of cards.
        cardDeck: makeShuffledDeck(),
      });
    } else {
      this.setState((state) => ({
        // Remove last 2 cards from cardDeck
        cardDeck: state.cardDeck.slice(0, -2),
        // Deal last 2 cards to currCards
        currCards: state.cardDeck.slice(-2),
      }));
    }
  };

  determineWinner = () => {
    if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
      this.setState({
        currWinner: "Player 1 wins this round.",
        winner1Count: this.state.winner1Count + 1,
        numberOfRound: this.state.numberOfRound + 1,
      });
    } else if (this.state.currCards[0].rank < this.state.currCards[1].rank) {
      this.setState({
        currWinner: "Player 2 wins this round.",
        winner2Count: this.state.winner2Count + 1,
        numberOfRound: this.state.numberOfRound + 1,
      });
    } else {
      this.setState({
        currWinner: "It's a draw.",
        numberOfRound: this.state.numberOfRound + 1,
      });
    }
  };

  finalWinner = () => {
    if (this.state.winner1Count > this.state.winner2Count) {
      this.setState({
        finalWinner: "Congratulations, Player 1 wins the game!!",
      });
    } else if (this.state.winner1Count < this.state.winner2Count) {
      this.setState({
        finalWinner: "Congratulations, Player 2 wins the game!!",
      });
    } else if (this.state.winner1Count === this.state.winner2Count) {
      if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
        this.setState({
          finalWinner: "Congratulations, Player 1 wins the game!!",
        });
      } else if (this.state.currCards[0].rank < this.state.currCards[1].rank) {
        this.setState({
          finalWinner: "Congratulations, Player 2 wins the game!!",
        });
      } else {
        this.setState({ finalWinner: "The game ends in a draw. SADGE" });
      }
    }
  };

  // winnerResult = () => {
  //   if (this.state.cardDeck.length === 0) {
  //     this.determineWinner();
  //     this.finalWinner();
  //   } else {
  //     this.determineWinner();
  //   }
  // };

  //target the value of the button
  resetButton = () => {
    this.setState({ nameButton: "Start New Game?" });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.currCards !== prevState.currCards &&
      this.state.numberOfRound < 25
    ) {
      this.determineWinner();
      // this.winnerResult();
    } else if (
      this.state.currCards !== prevState.currCards &&
      !this.cardDeck
      // prevState.numberOfRound === 25
    ) {
      // this.winnerResult();
      this.determineWinner();
      this.finalWinner();
      //Change text of button to reset game.
      this.resetButton();
    }
  }

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <li key={`${name}${suit}`}>
        {name} of {suit}
      </li>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <div>
            <u>Players' Cards</u>
          </div>
          <ol>{currCardElems}</ol>
          <button onClick={this.dealCards}>{this.state.nameButton}</button>
          <br />
          <div>
            <b>ROUND {this.state.numberOfRound}</b>
          </div>
          <div>{this.state.currWinner}</div>
          <br />
          <div>Rounds won by Player 1: {this.state.winner1Count}</div>
          <div>Rounds won by Player 2: {this.state.winner2Count}</div>
          <br />
          <div>{this.state.finalWinner}</div>
        </header>
        {/* <p>Test1</p> <<< THIS DOES NOT RENDER.*/}
      </div>
    );
  }
}

export default App;

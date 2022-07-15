import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import { Container, Row, Col } from "react-bootstrap";

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
      player1GameCount: 0,
      player2GameCount: 0,
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
        player1GameCount: this.state.player1GameCount + 1,
      });
    } else if (this.state.winner1Count < this.state.winner2Count) {
      this.setState({
        finalWinner: "Congratulations, Player 2 wins the game!!",
        player2GameCount: this.state.player2GameCount + 1,
      });
    } else if (this.state.winner1Count === this.state.winner2Count) {
      if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
        this.setState({
          finalWinner: "Congratulations, Player 1 wins the game!!",
          player1GameCount: this.state.player1GameCount + 1,
        });
      } else if (this.state.currCards[0].rank < this.state.currCards[1].rank) {
        this.setState({
          finalWinner: "Congratulations, Player 2 wins the game!!",
          player2GameCount: this.state.player2GameCount + 1,
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
      <Container>
        <Col className="col-7">
          {/* <Row>Player Card</Row> */}
          <Row key={`${name}${suit}`}>
            {name} of {suit}
          </Row>
        </Col>
      </Container>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <div>
            <u>Players' Cards</u>
          </div>
          <Container>
            <Row>
              <Col className="col-5">
                <Row style={{ display: "flex", justifyContent: "right" }}>
                  Player 1:
                </Row>
                <Row style={{ display: "flex", justifyContent: "right" }}>
                  Player 2:
                </Row>
              </Col>
              <Col>{currCardElems}</Col>
            </Row>
          </Container>
          <button onClick={this.dealCards}>{this.state.nameButton}</button>
          <br />
          <div>
            <b>ROUND {this.state.numberOfRound}</b>
          </div>
          <div>{this.state.currWinner}</div>
          <br />
          <div>
            <u>Rounds Won</u>
          </div>
          <div>Player 1: {this.state.winner1Count}</div>
          <div>Player 2: {this.state.winner2Count}</div>
          <br />
          <div>
            <u>Games Won</u>
          </div>
          <div>Player 1: {this.state.player1GameCount}</div>
          <div>Player 2: {this.state.player2GameCount}</div>
          <br />
          <div>{this.state.finalWinner}</div>
        </header>
        {/* <p>Test1</p> <<< THIS DOES NOT RENDER.*/}
      </div>
    );
  }
}

export default App;

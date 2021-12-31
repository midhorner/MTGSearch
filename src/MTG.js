import React, { Component } from "react";
import Card from "./card";

const ColorInput = (props) => {
  return (
    <>
      <input type="text" value={props.value} onChange={props.change} />
    </>
  );
};

const NameInput = (props) => {
  return (
    <>
      <input type="text" value={props.value} onChange={props.change} />
    </>
  );
};

class MTG extends Component {
  static defaultProps = {
    baseUrl: "https://api.magicthegathering.io/v1/cards?contains=imageUrl",
  };
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: this.props.baseUrl,
      cards: [],
      pageNumber: 1,
      buttonDisabled: false,
      colors: "",
      name: "",
    };
  }

  componentDidMount() {
    this.loadCards();
  }

  loadCards = async () => {
    const response = await fetch(
      `${this.state.baseUrl}&page=${this.state.pageNumber}`
    );
    const data = await response.json();
    this.setState({ cards: data.cards });
  };

  prevPage = () => {
    this.setState({
      pageNumber: this.state.pageNumber - 1,
      buttonDisabled: true,
    });
    setTimeout(() => {
      this.loadCards();
      this.setState({ buttonDisabled: false });
      console.log(this.state.pageNumber);
    }, 500);
  };

  nextPage = () => {
    this.setState({
      pageNumber: this.state.pageNumber + 1,
      buttonDisabled: true,
    });
    setTimeout(() => {
      this.loadCards();
      this.setState({ buttonDisabled: false });
      console.log(this.state.pageNumber);
    }, 500);
  };

  search = () => {
    if (this.state.colors.length !== 0) {
      this.setState({
        baseUrl: this.state.baseUrl + `&colors=${this.state.colors}`,
      });
    }
    if (this.state.name.length !== 0) {
      this.setState({
        baseUrl: this.state.baseUrl + `&name=${this.state.name}`,
      });
    }
  };

  render() {
    return (
      <div>
        <ColorInput
          value={this.state.colors}
          change={(e) => {
            this.setState({
              colors: e.target.value,
              pageNumber: 1,
            });
          }}
        />
        <NameInput
          value={this.state.name}
          change={(e) => {
            this.setState({
              name: e.target.value,
              pageNumber: 1,
            });
          }}
        />
        <button onClick={this.prevPage} disabled={this.state.buttonDisabled}>
          prev
        </button>
        <button onClick={this.nextPage} disabled={this.state.buttonDisabled}>
          next
        </button>
        <Card
          cards={this.state.cards}
          prev={this.prevPage}
          next={this.nextPage}
          page={this.state.pageNumber}
        />
      </div>
    );
  }
}
export default MTG;

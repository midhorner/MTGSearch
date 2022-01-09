import React, { Component } from "react";
import { Cards } from "./components/searchFilters/cards";
import { CardType } from "./components/searchFilters/cardType";
import { Colors } from "./components/searchFilters/colorCheckBoxes";
import { FormatType } from "./components/searchFilters/formatType";
import { LandTypes } from "./components/searchFilters/landTypeCheckBoxes";
import { NameInput } from "./components/searchFilters/nameInput";
import { Rarities } from "./components/searchFilters/rarityCheckBoxes";
import { Stuff } from "./props";

class MTG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: Stuff.baseUrl,
      cards: [],
      pageNumber: 1,
      buttonDisabled: false,
      colorsBool: this.boolArray(Stuff.colorChoices),
      landTypesBool: this.boolArray(Stuff.landTypeChoices),
      raritiesBool: this.boolArray(Stuff.rarityChoices),
      cardType: " ",
      formatType: " ",
      name: "",
      orderBy: "name",
      orderType: "asc",
    };
  }

  boolArray = (choiceArray) => {
    return new Array(choiceArray.length).fill(false);
  };

  loadCards = async () => {
    const response = await fetch(
      `${this.state.baseUrl}&page=${this.state.pageNumber}`
    );
    const data = await response.json();
    this.setState({ cards: data.cards });
    setTimeout(() => {
      console.log(`from load function ${this.state.baseUrl}`);
      this.setState({ buttonDisabled: false });
    }, 200);
  };

  changePage = (direction) => {
    this.setState({ buttonDisabled: true });
    direction === "next"
      ? this.setState({ pageNumber: this.state.pageNumber + 1 })
      : this.setState({ pageNumber: this.state.pageNumber - 1 });
    setTimeout(() => {
      this.loadCards();
      console.log(this.state.pageNumber);
    }, 500);
  };

  handleBoolArrayChange = (index, boolArray) => {
    let newVals = boolArray;
    newVals[index] = !boolArray[index];
    this.setState({ boolArray: newVals });
  };

  search = () => {
    this.setState({ buttonDisabled: true, baseUrl: Stuff.baseUrl });
    setTimeout(() => {
      const colorsArray = Stuff.colorChoices.filter((color, index) => {
        return this.state.colorsBool[index] === true ? color : null;
      });
      if (colorsArray.length !== 0) {
        let colorsString = `&colors=${colorsArray.toString()}`;
        this.setState({
          baseUrl: this.state.baseUrl + colorsString,
        });
      }
      const raritiesArray = Stuff.rarityChoices.filter((rarity, index) => {
        return this.state.raritiesBool[index] === true ? rarity : null;
      });
      if (raritiesArray.length !== 0) {
        let raritiesString = `&rarity=${raritiesArray.toString()}`;
        this.setState({
          baseUrl: this.state.baseUrl + raritiesString,
        });
      }
      const landTypesArray = Stuff.landTypeChoices.filter((type, index) => {
        return this.state.landTypesBool[index] === true ? type : null;
      });
      if (landTypesArray.length !== 0) {
        let landTypesString = `&subtypes=${landTypesArray.toString()}`;
        landTypesString = landTypesString.split(",").join("|");
        console.log(landTypesString);
        this.setState({
          baseUrl: this.state.baseUrl + landTypesString,
        });
      }
      if (this.state.name.length !== 0) {
        let queryName = `&name=${this.state.name.split(" ").join("+")}`;
        this.setState({
          baseUrl: this.state.baseUrl + queryName,
        });
      }
      if (this.state.cardType !== " ") {
        let queryCardType = `&types=${this.state.cardType}`;
        this.setState({
          baseUrl: this.state.baseUrl + queryCardType,
        });
      }
      if (this.state.formatType !== " ") {
        let queryFormatType = `&gameFormat=${this.state.formatType}`;
        this.setState({
          baseUrl: this.state.baseUrl + queryFormatType,
        });
      }
    }, 200);
    setTimeout(() => {
      this.loadCards();
      console.log(`from search function ${this.state.baseUrl}`);
    }, 700);
  };

  render() {
    return (
      <div style={main}>
        <div>
          <button
            onClick={() => this.changePage("previous")}
            disabled={this.state.buttonDisabled}
          >
            prev
          </button>
          <button
            onClick={() => this.changePage("next")}
            disabled={this.state.buttonDisabled}
          >
            next
          </button>
        </div>
        <Colors
          colorChoices={Stuff.colorChoices}
          colorsBool={this.state.colorsBool}
          handleOnColorChange={this.handleBoolArrayChange}
        />
        <NameInput
          value={this.state.name}
          handleOnNameChange={(e) => {
            this.setState({
              name: e.target.value,
              pageNumber: 1,
            });
          }}
        />
        <CardType
          cardType={this.state.cardType}
          handleOnCardTypeChange={(e) => {
            this.setState({ cardType: e.target.value });
          }}
          cardTypes={Stuff.cardTypes}
        />
        <LandTypes
          reveal={this.state.cardType}
          landTypeChoices={Stuff.landTypeChoices}
          landTypesBool={this.state.landTypesBool}
          handleOnLandTypeChange={this.handleBoolArrayChange}
        />
        <FormatType
          formatType={this.state.formatType}
          handleOnFormatChange={(e) => {
            this.setState({ formatType: e.target.value });
          }}
          formatTypes={Stuff.formatTypes}
        />
        <Rarities
          rarityChoices={Stuff.rarityChoices}
          raritiesBool={this.state.raritiesBool}
          handleOnRarityChange={this.handleBoolArrayChange}
        />
        <div>
          <button onClick={this.search} disabled={this.state.buttonDisabled}>
            SEARCH
          </button>
        </div>
        <Cards
          cards={this.state.cards}
          orderBy={this.state.orderBy}
          orderType={this.state.orderType}
        />
      </div>
    );
  }
}

const main = {
  display: "flex",
  flexDirection: "column",
};

export default MTG;

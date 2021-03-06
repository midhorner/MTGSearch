import React, { Component } from "react";
import { Cards } from "./components/cards";
import {
  CardType,
  FormatType,
  LandTypes,
  NameInput,
} from "./components/searchFilterInputs";
import { CheckBoxInput } from "./components/tailwindComponents";
import { arraySearchQuery, selectMenuQuery } from "./helperFunctions";
import { Stuff } from "./props";
// import data from "./data.json";

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
      console.log(this.state.cards);
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
    }, 300);
  };

  handleBoolArrayChange = (index, boolArray) => {
    let newVals = boolArray;
    newVals[index] = !boolArray[index];
    this.setState({ [boolArray]: newVals });
  };

  search = () => {
    this.setState({
      buttonDisabled: true,
      baseUrl: Stuff.baseUrl,
      pageNumber: 1,
    });
    setTimeout(() => {
      let baseUrl = this.state.baseUrl;
      this.setState({
        baseUrl:
          baseUrl +
          arraySearchQuery(
            Stuff.colorChoices,
            this.state.colorsBool,
            "colors"
          ) +
          arraySearchQuery(
            Stuff.rarityChoices,
            this.state.raritiesBool,
            "rarity"
          ) +
          selectMenuQuery(this.state.cardType, "types") +
          selectMenuQuery(this.state.formatType, "gameFormat"),
      });
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
    }, 200);
    setTimeout(() => {
      this.loadCards();
      console.log(`from search function ${this.state.baseUrl}`);
    }, 500);
  };

  render() {
    return (
      <div className="flex flex-wrap">
        <div className="flex flex-col">
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
          <CheckBoxInput
            id={"Colors"}
            choiceArray={Stuff.colorChoices}
            boolArray={this.state.colorsBool}
            handleOnChange={this.handleBoolArrayChange}
          />
          <NameInput
            value={this.state.name}
            handleOnNameChange={(e) => {
              this.setState({
                name: e.target.value,
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
            id={"Land Types"}
            choiceArray={Stuff.landTypeChoices}
            boolArray={this.state.landTypesBool}
            handleOnChange={this.handleBoolArrayChange}
          />
          <FormatType
            formatType={this.state.formatType}
            handleOnFormatChange={(e) => {
              this.setState({ formatType: e.target.value });
            }}
            formatTypes={Stuff.formatTypes}
          />
          <CheckBoxInput
            id={"Rarity"}
            choiceArray={Stuff.rarityChoices}
            boolArray={this.state.raritiesBool}
            handleOnChange={this.handleBoolArrayChange}
          />
          <div>
            <button onClick={this.search} disabled={this.state.buttonDisabled}>
              SEARCH
            </button>
          </div>
        </div>
        <div className="pl-10">
          <Cards
            cards={this.state.cards}
            orderBy={this.state.orderBy}
            orderType={this.state.orderType}
          />
        </div>
      </div>
    );
  }
}

export default MTG;

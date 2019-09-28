import React, { Component } from "react";
import Deck from "./components/Deck";
import data from "./data";

const api_endpoint = process.env.API_URL ? process.env.API_URL : "http://localhost:8080";

class PickerComponent extends Component {

  constructor(props) {
    super(props);
    const { match: { params } } = this.props;

    let filteredData = [];
    if (params.userId.startsWith("buyer")) {
      // is a buyer
      filteredData = data.filter(item => item.id.startsWith("seller"));
    } else {
      // is a seller, wants to see buyer
      filteredData = data.filter(item => item.id.startsWith("buyer"));
    }

    this.state = {
      "userId": params.userId,
      "cards": filteredData
    }
    // let endpoint = "/sellers";
    // if (params.userId.startsWith("seller")) {
    //   endpoint = "/buyers";
    // }
    // fetch(api_endpoint + endpoint)
    //     .then(res => res.json())
    //     .then((data) => {
    //       console.log("cards", data.results);
    //       this.setState({ "cards": data.results })
    //     })
    //     .catch(console.log)
  }

  render() {
    return <Deck userId={this.state.userId} cards={this.state.cards} />
  }
}

export default PickerComponent;

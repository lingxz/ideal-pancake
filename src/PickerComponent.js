import React, { Component } from "react";
import Deck from "./components/Deck";
import data from "./data";
import { Notification } from "react-bulma-components/full";
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring';

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
    return (
      <div>
        <Spring from={{ value: -1000 }} to={{ value: 0 }} config={{delay: 3000}}>
          {
            props =>
            <Link to={"/checkout/" + this.state.userId}>
              <Notification style={{ marginTop: props.value, position: "fixed", top: "10px", zIndex: "101", marginLeft: "12%", marginRight: "12%", width: "75%", padding: "0.5rem" }}>You have been matched!</Notification>
            </Link>
          }
        </Spring>
        <Deck userId={this.state.userId} cards={this.state.cards} />
      </div>
    )
  }
}

export default PickerComponent;

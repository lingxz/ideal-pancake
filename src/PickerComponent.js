import React, { Component } from "react";
import Deck from "./components/Deck";
import data from "./data";

// const PickerComponent = () => <Deck />;

const api_endpoint = "http://localhost:8080";

class PickerComponent extends Component {

  constructor(props) {
      super(props);
      const { match: { params } } = this.props;
      let endpoint = "/sellers";
      if (params.userId.startsWith("seller")) {
        endpoint = "/buyers";
      }
      // const cards = await fetch(api_endpoint + endpoint)
      //     .then(res => res.json())
      //     .then((data) => {
      //       return data.results;
      //         // console.log("cards", data.results);
      //         // this.setState({ "cards": data.results })
      //     })
      //     .catch(console.log)
      this.state = { 
        "userId": params.userId,
        "cards": data
      }
  }
  // componentDidMount() {
  //   let endpoint = "/sellers";
  //   const { match: { params } } = this.props;
  //   if (params.userId.startsWith("seller")) {
  //     endpoint = "/buyers";
  //   }
  //   fetch(api_endpoint + endpoint)
  //   .then(res => res.json())
  //   .then((data) => {
  //     console.log("cards", data.results);
  //     this.setState({ "cards": data.results })
  //     console.log(this.state.cards[0]);
  //   })
  //   .catch(console.log)
  // }


  render() {
      return <Deck userId={this.state.userId} cards={this.state.cards}/>
          }
      }

export default PickerComponent;

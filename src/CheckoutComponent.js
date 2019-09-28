import React, { Component } from "react";

class CheckoutComponent extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      user: params.userId,
      matches: {}
    };

    const url = `/basket/${params.userId}`;
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        data.matches.map(sellerId => {
          fetch(`/user/${sellerId}/profile`)
            .then(res => res.json())
            .then(data => {
              let newMatches = this.state.matches;
              newMatches[data.id] = data;
              this.setState({ matches: newMatches });
            })
            .catch(console.log);
        });
      })
      .catch(console.log);
  }

  handlePayment = () => {
    alert("hi!");
  };

  routeToSwipe = () => {
    alert("bye!");
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>{this.state.user}</h1>
        <h2>{`Total Cost: $${this.state.totalCost}`}</h2>
        <ul>
          {Object.keys(this.state.matches).map(sellerId => {
            return (
              <li>{`${this.state.matches[sellerId].name}\t\t${this.state.matches[sellerId].text}`}</li>
            );
          })}
        </ul>
        <button onClick={this.handlePayment}>{"Pay Now"}</button>
        <button onClick={this.routeToSwipe}>{"Add more items"}</button>
      </div>
    );
  }
}

export default CheckoutComponent;

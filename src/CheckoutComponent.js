import React, { Component } from "react";
import { Button, Box, Card, Media, Level, Heading } from "react-bulma-components/full";
import { Link } from 'react-router-dom';


class CheckoutComponent extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      user: params.userId,
      totalCost: 123,
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
      <div style={{ margin: "0.75rem" }}>
        <Heading size={2}>Welcome back, {this.state.user}!</Heading>
        {Object.keys(this.state.matches).map(sellerId => {
          return (
            <Card rounded outlined style={{ borderRadius: "6px", margin: "1.25rem" }}>
              <Card.Content card-content-padding={"1.5rem"}>
                  <Heading size={3}>{this.state.matches[sellerId].name}</Heading>
                  <p>{this.state.matches[sellerId].text}</p>
              </Card.Content>
            </Card>
          );
        })}
        <Button><Link>{`Total Cost: $${this.state.totalCost}`}. Checkout now!</Link></Button>
      </div>
    );
  }
}

export default CheckoutComponent;

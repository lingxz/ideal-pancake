import React, { Component } from "react";
import { Button, Heading, Table, Card } from "react-bulma-components/full";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

library.add(faDollarSign);

class CheckoutComponent extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      user: params.userId,
      totalCost: 100,
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
      <Card style={{ borderRadius: "6px", margin: "1.25rem", padding: "1rem" }}>
        <Heading size={2}>Welcome back, {this.state.user}!</Heading>
        <Table>
          <tbody>
            {Object.keys(this.state.matches).map((sellerId, index) => {
              return (
                <tr key={sellerId}>
                  <th>
                    {index + 1}
                  </th>
                  <td>
                    {this.state.matches[sellerId].name}
                  </td>
                  <td>
                    <FontAwesomeIcon icon="dollar-sign" />50
                  </td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td>Total</td>
              <td><FontAwesomeIcon icon="dollar-sign" />100</td>
            </tr>
          </tbody>
        </Table>
        <Button color='success'>Checkout</Button>
      </Card>
    );
  }
}

export default CheckoutComponent;

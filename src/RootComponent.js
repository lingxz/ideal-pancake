import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bulma-components/full";
import Card from './components/Card';
import { Card as BulmaCard, Heading } from "react-bulma-components/full";

class RootComponent extends Component {

    render() {
        return (
            <BulmaCard style={{ borderRadius: "6px", margin: "2rem", padding: "2rem" }}>
                <Heading>Buyer Flow</Heading>
                <Button><Link to={"/profile/buyer"}>Azure Lin</Link></Button>
                <Heading>Seller Flow</Heading>
                <Button><Link to={"/profile/seller1"}>Joyful Petals</Link></Button>
            </BulmaCard>
        )
    }
}

export default RootComponent;
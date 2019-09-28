import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bulma-components/full";
class RootComponent extends Component {

    render() {
        return (
            <ul>
                <li><Button><Link to={"/profile/buyer"}>Buyer Profile</Link></Button></li>
                <li><Button><Link to={"/profile/seller1"}>Seller 1 Profile</Link></Button></li>
                <li><Button><Link to={"/profile/seller2"}>Seller 2 Profile</Link></Button></li>
                <li><Button><Link to={"/picker/buyer"}>Buyer Picker</Link></Button></li>
                <li><Button><Link to={"/picker/seller1"}>Seller 1 Picker</Link></Button></li>
            </ul>
        )
    }
}

export default RootComponent;
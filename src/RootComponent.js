import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class RootComponent extends Component {

    render() {
        return (
            <ul>
                <li><Link to={"/profile/buyer"}>Buyer Profile</Link></li>
                <li><Link to={"/profile/seller1"}>Seller 1 Profile</Link></li>
                <li><Link to={"/profile/seller2"}>Seller 2 Profile</Link></li>
                <li><Link to={"/picker/buyer"}>Buyer Picker</Link></li>
                <li><Link to={"/picker/seller1"}>Seller 1 Picker</Link></li>
            </ul>
        )
    }
}

export default RootComponent;
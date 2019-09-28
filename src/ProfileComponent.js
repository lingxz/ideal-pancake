import React, { Component } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faDollarSign } from '@fortawesome/free-solid-svg-icons'

library.add(faGift, faDollarSign);

class ProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {
                "name": "user",
                "role": "buyer",
                "budget": "100",
                "items": []
            }
        };

        const { match: { params } } = this.props;
        fetch('/user/' + params.userId + '/profile.json')
            .then(res => res.json())
            .then((data) => {
                this.setState({ profile: data })
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <h1>{this.state.profile.name}</h1>
                <h2><FontAwesomeIcon icon="dollar-sign" />{this.state.profile.budget}</h2>
                <div>
                    {this.state.profile.items.map(item => {
                        return <div key={item.id}><FontAwesomeIcon icon="gift" />{item.name}</div>
                    })}
                </div>
            </div>
        )
    }
}

export default ProfileComponent;
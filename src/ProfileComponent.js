import React, { Component } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Button, Columns, Container, Card, Media } from "react-bulma-components/full";

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
            <Container>
                <Card>
                    <h1>{this.state.profile.name}</h1>
                    <h2><FontAwesomeIcon icon="dollar-sign" />{this.state.profile.budget}</h2>
                    {this.state.profile.items.map(item => {
                        return (
                            <Media key={item.id}>
                                <Media.Item position="left"><FontAwesomeIcon icon="gift" /></Media.Item><Media.Item>{item.name}</Media.Item>
                            </Media>
                        )
                    })}
                    <Button>Match!</Button>
                </Card>
            </Container>
        )
    }
}

export default ProfileComponent;
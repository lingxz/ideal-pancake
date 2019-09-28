import React, { Component } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Button, Box, Card, Media, Level } from "react-bulma-components/full";
import { link } from 'fs';

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
            <Box box-padding={"1.25rem"}>
                <Card>
                    <Level>
                        <Level.Item>
                            <Card.Image src={"/assets/azure-lin.jpg"} alt="profile picture" ratio='1by1' style={{ maxWidth: 320 }} is-flex="true" />
                        </Level.Item>
                    </Level>
                    <Level>
                        <Level.Item>
                            <Card.Content card-content-padding={"1.5rem"}>
                                <h1>{this.state.profile.name}</h1>
                                <h2><FontAwesomeIcon icon="dollar-sign" />{this.state.profile.budget}</h2>
                                {this.state.profile.items.map(item => {
                                    return (
                                        <Media key={item.id}>
                                            <Media.Item position="left"><FontAwesomeIcon icon="gift" /></Media.Item><Media.Item>{item.name}</Media.Item>
                                        </Media>
                                    )
                                })}
                            </Card.Content>
                        </Level.Item>
                    </Level>
                    <Level>
                        <Level.Item>
                            <Button>Match!</Button>
                        </Level.Item>
                    </Level>
                </Card>
            </Box>
        )
    }
}

export default ProfileComponent;
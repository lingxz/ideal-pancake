import React, { Component } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Button, Box, Card, Media, Level, Heading } from "react-bulma-components/full";
import Rating from "react-rating";
import { link } from 'fs';

library.add(faGift, faDollarSign);

class ProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {
                "name": "user",
                "role": "buyer",
                "budget": "",
                "profile_picture": "https://bulma.io/images/placeholders/480x480.png",
                "items": []
            }
        };

        const { match: { params } } = this.props;
        fetch('/user/' + params.userId + '/profile.json')
            .then(res => res.json())
            .then((data) => {
                if (data.name) {
                    this.setState({ profile: data });
                }
            })
            .catch(console.log)
    }

    hasBudget() {
        if (this.state.profile.budget) {
            return <Heading renderAs="h2" subtitle size={4}><FontAwesomeIcon icon="dollar-sign" />{this.state.profile.budget}</Heading>
        }
    }

    render() {
        return (
            <Box box-padding={"1.25rem"} style={{ height: "100vh", backgroundColor: "#fe5722" }} >
                <Card>
                    <Level>
                        <Level.Item>
                            <Card.Image src={this.state.profile.profile_picture} alt="profile picture" ratio='1by1' style={{ maxWidth: 320, paddingTop: "1.5rem" }} />
                        </Level.Item>
                    </Level>
                    <Level>
                        <Level.Item>
                            <Card.Content card-content-padding={"1.5rem"}>
                                <Heading size={1}>{this.state.profile.name}</Heading>
                                <p></p>
                                {this.state.profile.rating &&
                                    <Rating initialRating={this.state.profile.rating} />
                                }
                                {this.state.profile.budget &&
                                    <Heading renderAs="h2" subtitle size={4}><FontAwesomeIcon icon="dollar-sign" />{this.state.profile.budget}</Heading>
                                }
                                {this.state.profile.items.map(item => {
                                    return (
                                        <Media key={item.id}>
                                            <Media.Item position="left"><FontAwesomeIcon icon="gift" /></Media.Item><Media.Item>{item.name}</Media.Item>
                                        </Media>
                                    )
                                })}
                                <p></p>
                                <Button>Match!</Button>
                            </Card.Content>
                        </Level.Item>
                    </Level>
                </Card>
            </Box>
        )
    }
}

export default ProfileComponent;
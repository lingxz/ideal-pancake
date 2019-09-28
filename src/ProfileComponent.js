import React, { Component } from 'react';

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
                <h2>${this.state.profile.budget}</h2>
                <ul>
                    {this.state.profile.items.map(item => {
                        return <li>{item}</li>
                    })}
            </ul>
            </div>
                )
            }
        }

export default ProfileComponent;
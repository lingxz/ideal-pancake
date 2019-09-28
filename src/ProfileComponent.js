import React, { Component } from 'react';

class ProfileComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            profile: {
                "name": "user"
            }
        } ;

        const { match: { params } } = this.props;
        fetch('/user/' + params.userId + '/profile.json')
        .then(res => res.json())
        .then((data) => {
            this.setState({profile: data})
            console.log(this.state)
        })
        .catch(console.log)
      }

    render(){
        return(
            <h1>Hi, {this.state.profile.name}</h1>
        )
    }
}

export default ProfileComponent;
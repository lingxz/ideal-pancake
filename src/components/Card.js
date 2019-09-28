import React from "react";
import PropTypes from "prop-types";
import { animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";
import { Card as BulmaCard, Button } from "react-bulma-components/full";
import {
  BrowserRouter as Router,
  Link,
  Route // for later
} from 'react-router-dom'

class Card extends React.Component {

  cardClassNames() {
    let names = [];
    if (this.props.expanded) names.push("expanded");
    return names.join(' ');
  }

  render() {
    const { i, x, y, rot, scale, trans, bind, data, expanded } = this.props;
    const { id, name, role, text, stars, reviews, pics } = data[i];

    return (
      <animated.div
        className="deck"
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
        }}
      >
        <animated.div
          {...bind(i)}
          style={{
            // transform: interpolate([rot, scale], trans)
          }}
        >
          <BulmaCard>
            <Carousel>
              {pics.map((pic, index) => (
                <img src={pic} key={index} alt="profilePicture" />
              ))}
            </Carousel>
            <h2>{name}</h2>
            <h5>{role == "seller" ? stars : ""}</h5>
            <p>{text}</p>
            <p>{role== "seller" ? "some review" : ""}</p>
            <Button><Link to={"/profile/" + id}>More info</Link></Button>
          </BulmaCard>
        </animated.div>
      </animated.div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  distance: PropTypes.string,
  text: PropTypes.string,
  pics: PropTypes.array
};

export default Card;
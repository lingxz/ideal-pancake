import React from "react";
import PropTypes from "prop-types";
import { animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";
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
          <div className="card">
            <Carousel>
              {pics.map((pic, index) => (
                <img src={pic} key={index} alt="profilePicture" />
              ))}
            </Carousel>
            <h2>{name}</h2>
            <p>{role == "seller" ? stars : ""}</p>
            <p>{text}</p>
            <p>{role== "seller" ? "some review" : ""}</p>
            <p>{role == "buyer" ? "Budget: $" + data[i].budget : ""}</p>
            <button><Link to={"/profile/" + id}>More info</Link></button>
          </div>
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
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
    const { name, text, stars, reviews, pics } = data[i];

    return (
      <animated.div
        class="deck"
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
            <h5>{text}</h5>
            <h5>{stars}</h5>
            <p>some review</p>
            <button><Link to='/profile/buyer'>Home</Link></button>
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
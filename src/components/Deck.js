import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";

import Card from "./Card";
import { matchTwoPeople } from "../utils";

import "../styles/Deck.css";

const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck(superProps) {

  const [gone] = useState(() => new Set());
  // const [gone, set] = useState(new Set());
  // const [expanded, set] = useState(false)
  // const gone = new Set();
  const data = superProps.cards

  const [props, set] = useSprings(data.length, i => ({
    ...to(i),
    from: from(i)
  }));



  const bind = useGesture(
    ({
      args: [index, expanded],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);

      set(i => {      
        if (index !== i) return;
        const isGone = gone.has(index);

        if (isGone === true && dir === 1) {
          matchTwoPeople(superProps.userId, data[i].id);
          console.log("swiped right!!");

        } else if (isGone === true && dir === -1) {
          console.log("swiped left !!!");
        }

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === data.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );
  return props.map(({ x, y, rot, scale }, i) => (
    <Card
      key={i}
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      data={data}
      bind={bind}
      expanded={true}
    />
  ));
}

export default Deck;
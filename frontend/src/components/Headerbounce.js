import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";

function Headerbounce() {
  const [flip, set] = useState(false);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  });

  return (
    <animated.h1 style={props}>
      {" "}
      <h1 style={{ color: "white" }}> Shopping grocery list</h1>
    </animated.h1>
  );
}

export default Headerbounce;

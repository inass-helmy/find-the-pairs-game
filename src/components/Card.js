import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
from {
  transform: perspective(400px) rotate3d(0, 1, 0, 70deg);
  animation-timing-function: ease-in;
}
40% {
  transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
  animation-timing-function: ease-in;
}
60% {
  transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
  opacity: 1;
}
80% {
  transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
}
to {
  transform: perspective(400px);
}
`;

const verticalMove = keyframes`

0% {
  transform: translateY(-15%);
}
50% {
  transform: translateY(15%);
}
65% {
  transform: translateY(-4%);
}
80% {
  transform: translateY(4%);
}
95% {
  transform: translateY(-2%);
}
100% {
  transform: translateY(0%);
}`;

const StyledImg = styled.img`
  max-height: 100%;
  max-width: 100%;
  cursor: pointer;
  animation-name: ${(props) => (props.flipped ? (props.matched ? verticalMove : rotate) : "")};
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  animation-duration: 0.75s;
  box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
`;

const EmptyContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-height: 100%;
  max-width: 100%;
  box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
  pointer-events: none;
`;

const Card = ({ name, flipped, cardClicked, width, height, id, matched }) => {
  const clicked = () => {
    if (!flipped) cardClicked(id);
  };
  return (
    <div style={{ width: `${width}px`, height: `${height}px`, padding: "10px" }}>
      {matched ? (
        <EmptyContainer />
      ) : (
        <StyledImg
          flipped={flipped}
          width={width}
          height={height}
          src={`images/${flipped ? name + ".jpg" : "Card_Back.png"}`}
          onClick={clicked}
        ></StyledImg>
      )}
    </div>
  );
};

export default Card;

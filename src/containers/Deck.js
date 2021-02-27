import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import * as actions from "../store/actions/index";
import { getCardSize } from "../shared/utility";

const CardContainer = styled(Col)`
  position: relative;
  width: ${(props) => props.width}px;
  hight: ${(props) => props.height}px;
  box-sizing: border-box;
`;

const StyledDeck = styled(Row)`
  max-width: ${(props) => props.width + 5}px;
  max-height: ${(props) => props.height}px;
`;

const Deck = (props) => {
  //get the deck size according to the screen size
  const deckSize = useWindowSize();

  //get the card size according to the deck size
  const { cardSize, cols } = getCardSize(deckSize, props.noOfPairs);

  useEffect(() => {
    getCardSize(deckSize, props.noOfPairs);
    props.onStartGame();
  }, [props.noOfPairs]);

  //a hook function to listen to the 'resize' event to always get the screen size when changed
  function useWindowSize() {
    const [deckSize, setDeckSize] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setDeckSize({
          width: (window.innerWidth || document.documentElement.clientWidth) * (785 / 1440),
          height: (window.innerHeight || document.documentElement.clientHeight) * (664 / 900),
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return deckSize;
  }

  function cardClickHandler(id, index) {
    if (props.flippedCardsId.length == 2) return;
    props.flipCard(index, id);
    if (props.flippedCardsId.length == 1) checkMatch(index);
  }

  function checkMatch(selectedIndex) {
    const { cards, flippedCardsId } = props;
    if (cards[flippedCardsId[0]].name === cards[selectedIndex].name) {
      props.setMatchedCards(selectedIndex);
    } else {
      props.resetCardsTimeout();
    }
  }

  return (
    <StyledDeck width={deckSize.width} height={deckSize.height}>
      {props.cards.map((card, i) => {
        return (
          <CardContainer width={cardSize.width} height={cardSize.height} key={i} span={24 / cols}>
            <Card
              id={card.id}
              name={card.name}
              flipped={props.flippedCardsId.includes(i)}
              matched={props.matchedCards.includes(i)}
              width={cardSize.width}
              height={cardSize.height}
              cardClicked={() => cardClickHandler(card.id, i)}
            />
          </CardContainer>
        );
      })}
    </StyledDeck>
  );
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    noOfPairs: state.noOfPairs,
    flippedCardsId: state.flippedCardsId,
    matchedCards: state.matchedCards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    flipCard: (index, id) => dispatch(actions.flipCard(index, id)),
    onStartGame: () => dispatch(actions.startGame()),
    setMatchedCards: (index) => dispatch(actions.setMatchedCards(index)),
    resetCardsTimeout: () => dispatch(actions.resetCardsTimeout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

import React, { useEffect } from "react";
import { Row, Col, Layout } from "antd";
import styled from "styled-components";
import GameHeader from "../components/GameHeader";
import Deck from "./Deck";
import SideSection from "./SideSection";
import CongratulationMsg from "../components/CongratulationMsg";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const StyledLayout = styled(Layout)`
  min-width: 100vw;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  justify-content: center;
  align-content: center;
  color: #232527;
  font-family: Nunito;
  background: -moz-linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(235, 237, 238, 1) 100%);
  background: -webkit-linear-gradient(
    135deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(235, 237, 238, 1) 100%
  );
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(235, 237, 238, 1) 100%);
`;

const GameLayout = (props) => {
  return (
    <StyledLayout>
      <Row justify="center">
        <Col>
          <GameHeader />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={14}>
          {!props.gameOver ? (
            <Deck />
          ) : (
            <CongratulationMsg
              noOfTries={props.noOfTries}
              finalScore={props.score}
              onPlayAgain={props.onRestartGame}
              gameOver={props.gameOver}
            />
          )}
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 5 }}>
          <SideSection />
        </Col>
      </Row>
    </StyledLayout>
  );
};
const mapStateToProps = (state) => {
  return {
    noOfTries: state.noOfTries,
    score: state.score,
    gameOver: state.gameOver,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRestartGame: () => dispatch(actions.restartGame()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameLayout);

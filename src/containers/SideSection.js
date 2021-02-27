import React from "react";
import { Button, Menu, Dropdown, Col, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

const StyledLayout = styled.div`
  background-color: #fbfbfb;
  padding: 2% 4% 4% 3%;
  display: flex;
  font-family: OpenSans;
  font-size: 16px;
  color: #232527;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  margin-top: 10px;
  width: 18.3vw;
  height: 42.5vh;
  @media (max-width: 1100px) {
    font-size: 14px;
    width: 25vw;
    // height: 55vh;
    margin: 40px auto;
  }
  @media (max-width: 770px) {
    font-size: 14px;
    width: 43vw;
    height: 50vh;
    margin: 40px auto;
  }
`;

const SectionTitle = styled.span`
  font-size: 1.45em;
  font-family: Nunito;
  font-weight: bold;
`;

const Section = styled(Col)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;
const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DropdownTitle = styled.span`
  padding-right: 1em;
`;

const Score = styled.span`
  font-family: Nunito;
  font-size: 2.5em;
  font-weight: bold;
`;

const ActiveScore = styled.span`
  color: #1090ff;
`;

const StyledDivider = styled(Divider)`
  min-width: 50%;
  width: 50%;
  align-self: start;
`;

const StyledDropdown = styled(Dropdown)`
  width: 170px;
  height: 32px;
`;

const StyledButton = styled(Button)`
  width: 34%;
  display: inline-flex;
`;

const DropdownButton = styled(Button)`
  width: 72.5%;
`;

const SideSection = (props) => {
  const handleRestart = () => {
    props.restartGame();
    props.startGame();
  };

  const menu = (
    <Menu onClick={(e) => props.setNoOfPairs(e.key)}>
      <Menu.Item key="6">6 pairs</Menu.Item>
      <Menu.Item key="8">8 pairs</Menu.Item>
      <Menu.Item key="10">10 pairs</Menu.Item>
      <Menu.Item key="12">12 pairs</Menu.Item>
      <Menu.Item key="15">15 pairs</Menu.Item>
      <Menu.Item key="18">18 pairs</Menu.Item>
      <Menu.Item key="21">21 pairs</Menu.Item>
    </Menu>
  );

  return (
    <StyledLayout>
      <Section>
        <SectionTitle>Score</SectionTitle>
        <Score>
          <ActiveScore>{props.score}</ActiveScore> / {props.noOfPairs}
        </Score>
        <span>Tries: {props.noOfTries} </span>
      </Section>
      <StyledDivider />
      <Section>
        <SectionTitle>Options</SectionTitle>
        <DropdownContainer>
          <DropdownTitle>Size</DropdownTitle>
          <StyledDropdown overlay={menu}>
            <DropdownButton>
              {`${props.noOfPairs} pairs`} <DownOutlined />
            </DropdownButton>
          </StyledDropdown>
        </DropdownContainer>
        <StyledButton type="primary" onClick={() => handleRestart()}>
          Restart
        </StyledButton>
      </Section>
    </StyledLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    noOfPairs: state.noOfPairs,
    noOfTries: state.noOfTries,
    score: state.score,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNoOfPairs: (number) => dispatch(actions.setNoOfPairs(number)),
    startGame: () => dispatch(actions.startGame()),
    restartGame: () => dispatch(actions.restartGame()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideSection);

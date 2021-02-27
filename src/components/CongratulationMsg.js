import React, { useState } from "react";
import styled from "styled-components";
// import Modal from "antd/lib/modal";

import { Modal } from "antd";

const StyledSpan = styled.span`
  color: #1090ff;
  font-size: 1.2em;
`;

const congratulationMessage = (props) => {
  const [showModal, setShowModal] = useState(props.gameOver);

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Modal
      title="CONGRATULATIONS YOU WON!!!"
      visible={showModal}
      onOk={props.onPlayAgain}
      onCancel={handleCancel}
      okText="Play Again 😄"
      cancelText="No Thanks."
      closable={false}
    >
      <p>
        YOU MADE IT IN <StyledSpan>{props.noOfTries}</StyledSpan> WITH SCORE{" "}
        <StyledSpan>{props.finalScore}</StyledSpan>, PLAY AGAIN?
      </p>
    </Modal>
  );
};

export default congratulationMessage;

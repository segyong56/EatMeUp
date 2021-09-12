import React from "react";
import styled, { keyframes } from "styled-components";

/* styled-component */
const BackGroundModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 15px 15px;
  background: rgba(0, 0, 0, 0.3);
  opacity: 1;
  transition: opacity 0.15s linear;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const showDialog = keyframes`
   from {
    opacity: 0;
    transform: translateY(-200px);
   }
   to{
    opacity: 1;
    transform: translateY(0px);
   }
`;

const ModalDialog = styled.div`
  display: block;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  width: 400px;
  height: 500px;
  border-radius: 20px;
  border: 2px solid gray;
  max-width: calc(100% - 0.01px) !important;
  background: rgba(255, 255, 255);
  z-index: 999999;
  opacity: 1;
  animation: ${showDialog} 0.5s forwards;
`;
const AddIngre = ({ setOpenAddIngre }) => {
  /* function area */
  const openHandler = () => {
    setOpenAddIngre(false);
  };

  return (
    <>
      <BackGroundModal onClick={openHandler}>
        <ModalDialog>
          
        </ModalDialog>
      </BackGroundModal>
    </>
  );
};

export default AddIngre;

import React from "react";
import Dropzone from "react-dropzone";
import { BackGroundModal, ModalDialog, DropzoneArea, FoodInfoBox, AddToRefriBtn } from "../styled/Style";


const AddIngre = ({ setOpenAddWindow }) => {
  /* function area */
  const openHandler = () => {
    setOpenAddWindow(false);
  };

  const submitHandler = () => {};
  const dropHandler = () => {};
  const dataPickerHandler = (e) => {
    console.log(e.currentTarget.value)
  };

  return (
    <>
      <BackGroundModal>
        <ModalDialog>
          <div className='closeBtn'>
            <i 
            className='far fa-times-circle'
            onClick={openHandler}
            ></i>
          </div>

          <div className='title'>
            <h1>음식 추가하기</h1>
          </div>
          <form onSubmit={submitHandler}>
            <Dropzone onDrop={dropHandler} multiple={false} maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                <DropzoneArea {...getRootProps()}>
                  <input {...getInputProps()} />
                </DropzoneArea>
              )}
            </Dropzone>
            <FoodInfoBox>
              <div className='foodname-box'>
                <span>음식이름 : </span>
                <input type='text' placeholder='음식이름을 입력해주세요.' />
              </div>

              <div className='buydate-box'>
                <span>구매일자 : </span>
                <input
                onChange={dataPickerHandler} 
                type="date" />
              </div>

              <div className='foodlife-box'>
                <span>유통기한 : </span>
                <input 
                type="date" 
                onChange={dataPickerHandler}
                />
              </div>
            </FoodInfoBox>
            <AddToRefriBtn>
              <button onClick={submitHandler}>추가하기</button>
            </AddToRefriBtn>
          </form>
        </ModalDialog>
      </BackGroundModal>
    </>
  );
};

export default AddIngre;

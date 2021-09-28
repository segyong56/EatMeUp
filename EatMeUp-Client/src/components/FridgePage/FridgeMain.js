import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { allFoods, saveFridgeInfo } from "../../_actions/fridgeActions";
import { foodData } from '../dummydata'

/* 컴포넌트 */
import FridgeInner from "./sections/FridgeInner";
import FridgeBtn from "./sections/FridgeBtn";
import Header from "../Util/Header";
import Footer from "../Util/Footer";
import EditFridge from "./sections/EditFridge";
import Loader from "../Util/Loader";


/* 냉장고 페이지 */
const FridgeMain = () => {

  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state.allFoods);
  const food = useSelector((state) => state.food);
  const savedfoods = useSelector((state) => state.savedfoods)
  const [foodList, setFoodList] = useState(foods);

  useEffect(() => {
    
    dispatch(allFoods());
    setFoodList(foods)

  }, [dispatch, food, savedfoods]);

  // /* 유통기한이 임박한 냉장고 속 음식 보여주기 */
  // let redFoods = []
  // FOODS.forEach((food) => {

  //   if (food.life <= 30) {
  //     redFoods.push(food.food_name)
  //   }
  // });

  const [checkedFoods, setCheckedFoods] = useState([]);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);


  /* 수정하기 버튼, 수정한 음식리스트 저장 요청 핸들러 */
  const showEditBtnHandler = (e) => {

    e.preventDefault();
    setShowEditBtn(!showEditBtn);
    setFoodList(foods)
    if (showEditBtn) {

      dispatch(saveFridgeInfo(foodList));

      setFoodList(foods)
    }
  };
 

  /* 추가된 재료 삭제 핸들러 */
  const handleDelete = (idx) => {
    const deleteFood = checkedFoods.filter((food, id) => {
      if (id !== idx) return food;
    });
    setCheckedFoods(deleteFood);
    setCurrentIdx(idx);
  };


  return (
    <>
      <Header id={1} />
      <section>
        {/* 유통기한이 임박한 음식 추천기능 */}

        <SearchBox>
          <FridgeTitle>
            마이냉장고
          </FridgeTitle>

          {/* 체크된 음식 담는 영역 */}
          <CheckedFoodsBox>
            <Stack direction='row' spacing={1}>
              <i className='fas fa-shopping-basket'></i>
              {checkedFoods.length === 0 ? (
                <span className='placeholder'>냉장고 재료를 추가해 주세요</span>
              ) : (
                checkedFoods.map((food, idx) => {
                  return (
                    <Chip
                      key={idx}
                      label={food}
                      onDelete={() => handleDelete(idx)}
                    />
                  );
                })
              )}
            </Stack>
          </CheckedFoodsBox>

          <GotoBtnBox>
            <Link to='/recipes/result'>
              레시피 보기 <i className='fas fa-play'></i>
            </Link>
          </GotoBtnBox>
        </SearchBox>

        {/* 냉장고 */}
        <ContentBox>
          {/* 냉장고 안 */}
          {showEditBtn ? (
            <EditFridge
              foodList={foodList}
              setFoodList={setFoodList}
              showEditBtn={showEditBtn}
              setShowEditBtn={setShowEditBtn}
            />
          ) : (
            <FridgeInner
              foods={foods}
              checkedFoods={checkedFoods}
              setCheckedFoods={setCheckedFoods}
            />
          )}

          {/* 냉장고 핸들러 버튼들 */}
          <FridgeBtn
            showEditBtnHandler={showEditBtnHandler}
            showEditBtn={showEditBtn}
          />
        </ContentBox>
      </section>
      <Footer />
    </>
  );
};

// 음식담는 영역 css
const SearchBox = styled.div`
  width: 80%;
  margin: 0px auto;
  display: flex;
  position: relative;
  margin-top: 50px;
`;

const FridgeTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

// 클릭한 음식담는 영역
const CheckedFoodsBox = styled.div`
  width: 70%;
  height: 40px;
  border: 2px solid #ebe9e5;
  border-radius: 30px 0px 0px 30px;
  margin-left: 10px;
  padding-top: 5px;

  .fa-shopping-basket {
    margin-left: 20px;
    color: #a8a7a3;
    line-height: 30px;
  }

  .name {
    margin-left: 15px;
    padding: 3px 20px;
    background-color: #e1e0dc;
    border-radius: 30px;
  }

  .placeholder {
    text-indent: 10px;
    font-size: 14px;
    line-height: 30px;
    color: #a8a7a3;
  }
`;

// 재료기반 레시피 찾기버튼
const GotoBtnBox = styled.div`
  width: 120px;
  height: 33px;
  border-radius: 0px 30px 30px 0px;
  line-height: 33px;
  background: white;
  color: white;
  font-weight: bold;
  padding: 8px;
  text-align: center;

  a {
    text-decoration: none;
    color: #303030;
  }
`;

//냉장고
const ContentBox = styled.div`
  width: 85%;
  margin: 2rem auto;
`;

export default FridgeMain;

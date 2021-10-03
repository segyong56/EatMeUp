import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest, clearErrors } from "../../_actions/authActions";

import theme from "../StyledComponent/theme";

const { swal } = window;
const Header = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      swal("Please!", "로그아웃 실패, 다시 확인해주세요.", "error");
      dispatch(clearErrors());
      return;
    }
  }, [dispatch, error]);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutRequest())
    history.push('/')
  };

  return localStorage.auth ? (
    <EatMeUpHeader>
      <div className='left-menu'>
        <div className='logo'>
          <Link to='/'>
            <img
              src='https://eatmeup-image.s3.ap-northeast-2.amazonaws.com/9a0a59bd263f1840cabda2278d11570b'
              alt='logo'
            />
          </Link>
        </div>
        <div className='menuBtns'>
          <Link to='/recipes'>
            <div className='menu left'>모든레시피</div>
          </Link>
          <Link to='/fridge'>
            <div className='menu left'>마이냉장고</div>
          </Link>
        </div>
      </div>
      {/* 오른쪽메뉴(로그인, 회원가입, 마이페이지) */}
      <div className='right-menu'>
        <div className='menuBtns'>
          <Link to='/user/mypage'>
            <div className='user'><img src="../food_img/people.jpeg" alt="user" /></div>
          </Link>
          <Logout><i className="fas fa-sign-out-alt" onClick={logoutHandler}></i></Logout>
        </div>
      </div>
    </EatMeUpHeader>
  ) : (
    <EatMeUpHeader>
      <div className='left-menu'>
        <div className='logo'>
          <Link to='/'>
            <img
              src='https://eatmeup-image.s3.ap-northeast-2.amazonaws.com/9a0a59bd263f1840cabda2278d11570b'
              alt='logo'
            />
          </Link>
        </div>
        
      </div>
      {/* 오른쪽메뉴(로그인, 회원가입, 마이페이지) */}
      <div className='right-menu'>
        <div className='menuBtns'>
          <Link to='/login'>
            <div className='menu right'>LOGIN</div>
          </Link>
          <Link to='/signup'>
            <div className='menu right'>SIGNUP</div>
          </Link>
        </div>
      </div>
  
    </EatMeUpHeader>
  );
};

const EatMeUpHeader = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  .logo {
    width: 160px;
    /* font-family: Fredoka One; */
    font-size: 35px;
    text-indent: 30px;
  }

  .logo > a > img {
    width: 100%;
  }

  .left-menu {
    display: flex;
    margin-left: 3vw;
  }

  .menuBtns {
    display: flex;
    margin: 8px 60px;
  }

  .menu {
    font-weight: 500;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 17px;
    border-radius: 30px;
    transition: 0.3s;
  }

  .fa-sign-out-alt {
    cursor: pointer;
  }


  .menu:hover {
    background-color: white;
    color: #f4c050;
  }

  .left {
    margin-right: 5px;
  }

  a {
    text-decoration: none;
    color: #303030;
  }

  .right-menu {
    margin-right: 3vw;
  }

  .right {
    width: 100px;
    height: 35px;
    border-radius: 30px;
    text-align: center;
    line-height: 35px;
  }
  .user {
    width: 48px;
    height: 48px;
    
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .right:hover {
    background-color: ${theme.colors.yellow};
    color: white;
  }
`;

const Logout = styled.button`

  border: none;
  font-size: 25px;
  background-color: white;
  color: grey;
`

export default Header;

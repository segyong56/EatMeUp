import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { XSmallBtn } from "../StyledComponent/buttons";
import theme from "../StyledComponent/theme";

const Sidebar = ({ id }) => {
  const menu = [
    { menu: "My Page", link: "/user/mypage", icon: "fas fa-home" },
    { menu: "My Recipes", link: "/user/myrecipe", icon: "fas fa-utensils" },
    { menu: "Liked Recipes", link: "/user/likelist", icon: "fas fa-heart" },
    {
      menu: "Meal Planner",
      link: "/user/myplanner",
      icon: "far fa-calendar-alt",
    },
    { menu: "MyInfo", link: "/user/info", icon: "fas fa-user" },
  ];

  const [currentId, setcurrentId] = useState(id);

  const menuHandler = (idx) => {
    setcurrentId(idx);
  };

  return (
    <div>
      <SideMenu>
        {menu.map((item, idx) => {
          return (
            <Link to={item.link} key={idx}>
              <MenuBtn
                onClick={() => {
                  menuHandler(idx);
                }}
                fillColor={
                  currentId === idx
                    ? theme.colors.yellow
                    : theme.colors.background
                }
                color={currentId === idx ? "white" : theme.colors.black}
              >
                <div className="point">
                  <i className={item.icon} id="icon"></i>
                </div>
                <div className="menu">
                  {item.menu}
                </div>
                
              </MenuBtn>
            </Link>
          );
        })}
      </SideMenu>
    </div>
  );
};

const SideMenu = styled.div`
  display: block;
  width: 200px;
  border-radius: 30px;
  align-items: left;
  margin: 0 2vw 0 4vw;
  a {
    text-decoration: none;
  }
`

const MenuBtn = styled(XSmallBtn)`
  width: 170px;
  height: 50px;
  display: flex;
  align-items: center;
  border: solid 1px ${theme.colors.lightgrey};
  margin: 0 0 15px 15px;
  font-family: "Noto Sans KR";
  font-weight: 500;

  &:hover {
    background-color: ${theme.colors.yellow};
    cursor: pointer;
    color: white;
  }

  .point {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: white;
    text-align: center;
    margin-left: 5px;
    i {
      margin: 8px;
      color: black;
      font-size: 14px;
    }
  }

  .menu {
    margin-left: 10px;
    font-size: 14px;
    line-height: 8px;
  }

`;

export default Sidebar;

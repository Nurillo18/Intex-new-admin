import React from "react";
import { Link } from "react-router-dom";
import AtributeProducts from "./AtributeTable";
import MButton from "../../BaseComponents/MButton/MButton";
// Styles
import "../../BaseComponents/MButton/MButton.css";
// Images
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import { useSelector, useDispatch } from "react-redux";
import { searchProduction } from "../../redux/siteDataReducer";

export default function Home() {
  const search = useSelector((state) => state.data.search);
 
  const dispatch = useDispatch();
  return (
    <div>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/atribut">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            Атрибуты
          </h2>
        </Link>
      </div>
      <div className="pt-6 pb-8 px-homeContentPadding h-[100vh] overflow-auto">
        <div>
          <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
            Атрибуты
          </h2>
          <div className="bg-white py-3 px-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
              <MButton BType="filter bg-filterBg" type="button">
                Фильтр
              </MButton>
              <input
                id="homeSearch"
                className="py-3 ml-4 w-homeInpWidth outline-none pl-9 pr-3 rounded-xl bg-headerInpBg"
                type="text"
                placeholder="Поиск товара"
                autoComplete="off"
                value={search}
                onChange={(e) => {
                  dispatch(searchProduction(e.target.value))
                }}
              />
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-base text-homeColor mr-2.5">
                Сортировка
              </strong>
              <div className="w-homeSortWidth cursor-pointer mr-6 flex items-center justify-between bg-headerInpBg p-3 rounded-xl">
                <span className="font-medium text-sm text-homeSortWrap">
                  По А-Я
                </span>
                <svg
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 11L12 14L15 11"
                    stroke="#04009A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Link to="/addAtribut" className="add bg-filterBg" type="button">
                Добавить
              </Link>
            </div>
          </div>
        </div>
        <AtributeProducts />
      </div>
    </div>
  );
}

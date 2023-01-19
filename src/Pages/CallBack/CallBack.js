import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MButton from "../../BaseComponents/MButton/MButton";
// Images
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import THead from "../../components/THead/THead";
import TBody from "../../components/TBody/TBody";

const env = process.env.REACT_APP_ALL_API;

const data = [
  {
    title: "ID",
    image: true,
    style: "w-20",
  },
  {
    title: "Имя",
    image: true,
    style: "w-[248px]",
  },
  {
    title: "Роль ползователя",
    image: true,
    style: "w-[170px]",
  },
  {
    title: "Статус",
    image: false,
    style: "w-[140px]",
  },
  {
    title: "Последний активность",
    image: false,
    style: "w-[188px]",
  },
  {
    title: "Номер телефона",
    image: true,
    style: "w-[162px]",
  },
  {
    title: "Дата рождение",
    image: false,
    style: "w-[120px]",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  // const [loader, setLoader] = useState([]);

  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    // setLoader(true);
    axios
      .get(`${env}consultations?page=${1}&limit=${10}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res?.data.result);
      })
      .finally(() => {
        // setLoader(false);
      });
  }, [token]);
  products;

  // ------> Table Row Information
  const vitalData = products.map((item) => {
    return [
      {
        title: item.id,
        style: "w-20",
      },
      {
        title: item.about_en,
        image: item.image[0],
        style: "w-[248px] flex pl-3",
      },
      {
        title: item.price,
        style: "w-[170px] pl-3",
      },
      {
        title: item.category_en,
        style: "w-[140px] pl-3",
        textClass:
          "py-[5px] px-[10px] bg-[#0BCC23] rounded-[4px] text-xs text-white",
      },
      {
        title: item.category_en,
        style: "w-[188px] pl-3",
      },
      {
        title: "28.09.2022 14:00",
        style: "w-[162px]",
      },
      {
        title: "28.09.2022",
        style: "w-[100px]",
      },
    ];
  });

  return (
    <>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/callBack">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            Обратный связ
          </h2>
        </Link>
      </div>
      <div className="pt-6 pb-8 px-homeContentPadding overflow-y-scroll h-[100vh]">
        <div>
          <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
            Обратный связ
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
            </div>
          </div>
        </div>
        <div className="pt-5">
          <table className="w-full">
            <THead data={data}></THead>
            <TBody vitalData={vitalData}></TBody>
          </table>
        </div>
      </div>
    </>
  );
}

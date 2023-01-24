import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MButton from "../../BaseComponents/MButton/MButton";
import TBody from "../../components/TBody/TBody";
import THead from "../../components/THead/THead";
// Images
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import Trash from "../../Assets/Images/ProductsImgs/trash.svg";

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
    style: "w-[400px]",
  },
  {
    title: "Номер телефона",
    image: true,
    style: "w-[240px]",
  },
  {
    title: "Время заяавку",
    image: false,
    style: "w-[260px]",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);

  const token = JSON.parse(window.localStorage.getItem("token"));

  // ------> Get Consultaion
  useEffect(() => {
    axios
      .get(`${env}consultations?page=${0}&limit=${100}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setProducts(res?.data.result);
      })
      .finally(() => {});
  }, [token]);

  // ------> Table Row Information
  const vitalData = products?.map((item) => {
    return {
      mainId: item.id,
      data: [
        {
          title: item.id,
          style: "w-20",
        },
        {
          title: item.name,
          image: null,
          style: "w-[400px] flex pl-3",
        },
        {
          title: item.phone,
          style: "w-[240px] pl-3",
        },
        {
          title: item.created_at,
          style: "w-[260px] pl-3",
        },
      ],
    };
  });

  return (
    <>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor">/</span>
        <Link to="/callBack">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">Обратный связ</h2>
        </Link>
      </div>
      <div className="pt-6 pb-8 px-homeContentPadding overflow-y-scroll h-[95vh]">
        <div>
          <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">Обратный связ</h2>
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
              <strong className="font-semibold text-base text-homeColor mr-2.5">Сортировка</strong>
              <div className="w-homeSortWidth cursor-pointer mr-6 flex items-center justify-between bg-headerInpBg p-3 rounded-xl">
                <span className="font-medium text-sm text-homeSortWrap">По А-Я</span>
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
        <div className="bg-white rounded-xl mt-4">
          <div className="flex py-3 px-3 items-center z-50">
            <input className="mr-3 w-[18px] h-[18px] cursor-pointer" type="checkbox" />
            <span className="text-[#b9b9b9] mr-3">0, Выбрано</span>
            <img className="cursor-pointer" src={Trash} alt="Trash icon" />
          </div>
          <table className="w-full !mb-20">
            <THead data={data}></THead>
            <TBody vitalData={vitalData} urlRoute="consultations"></TBody>
          </table>
        </div>
      </div>
    </>
  );
}

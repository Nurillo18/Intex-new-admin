import { useEffect, useState } from "react";
import Information from "./ProductPages/Infotmation/Infotmation";
import ProductImgs from "./ProductPages/ProductImages/Images";
import AtributPage from "./ProductPages/AtributPage/AtributPage";
import Line from "./../../BaseComponents/Line/Line";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import axios from "axios";

export default function AddProduct() {
  const [info, setInfo] = useState(true);
  const [img, setImg] = useState(false);
  const [atr, setAtr] = useState(false);
  const [langData, setLangData] = useState([]);
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);
  const env = process.env.REACT_APP_ALL_API;

  useEffect(() => {
    axios
      .get(`${env}sites`)
      .then((res) => {
        setLangData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            {languages[lang].header.products}
          </h2>
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/addProduct">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">Добавить продуктов</h2>
        </Link>
      </div>
      <div className="py-6 overflow-scroll h-[100vh] px-headerPaddingX">
        <div className="mb-6">
          <h2 className="font-bold text-2xl leading-8">{languages[lang].main.addProduct}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl">
          <ul className="flex items-center list-none space-x-4 w-addProductListWidth border-b-2">
            {langData.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setInfo(true);
                  setImg(false);
                  setAtr(false);
                }}
                className={` font-medium relative cursor-pointer text-sm text-addProductLinks leading-lead pb-2.5`}
              >
                {item.lang_ru ? "Pусский язык" : ""}
                {info ? <Line /> : ""}
              </li>
            ))}
            {langData.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setInfo(false);
                  setImg(true);
                  setAtr(false);
                }}
                className={` font-medium relative cursor-pointer text-sm text-addProductLinks leading-lead pb-2.5`}
              >
                {item.lang_uz ? "Узбекский язык" : ""}
                {img ? <Line /> : ""}
              </li>
            ))}
            {langData.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setInfo(false);
                  setImg(false);
                  setAtr(true);
                }}
                className={` font-medium relative cursor-pointer text-sm text-addProductLinks leading-lead pb-2.5`}
              >
                {item.lang_en ? "Aнглийский язык" : ""}
                {atr ? <Line /> : ""}
              </li>
            ))}
          </ul>
          <div>
            {langData.map((item) =>
              item.lang_ru ? (
                info ? (
                  <Information key={item.id} infoPage={setInfo} imgPage={setImg} atrPage={setAtr} />
                ) : (
                  ""
                )
              ) : (
                ""
              )
            )}
            {langData.map((item) =>
              item.lang_uz ? (
                img ? (
                  <ProductImgs key={item.id} infoPage={setInfo} imgPage={setImg} atrPage={setAtr} />
                ) : (
                  ""
                )
              ) : (
                ""
              )
            )}
            {langData.map((item) =>
              item.lang_uz ? (
                atr ? (
                  <AtributPage key={item.id} infoPage={setInfo} imgPage={setImg} atrPage={setAtr} />
                ) : (
                  ""
                )
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

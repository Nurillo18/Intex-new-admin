import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Modal } from "../../../../components/Modal/Modal";
import Label from "../../../../components/Label/Label";
import Dounload from "../../../../Assets/Images/HomeContentImg/dounload.svg";
import delterImgAdded from "../../../../Assets/Images/HomeContentImg/addedImgDel.svg";
import delterImgUnAdded from "../../../../Assets/Images/HomeContentImg/addUnUpload.svg";
import deleteIcon from "../../../../Assets/Images/ProductsImgs/deleteIcon.svg";
import * as Yup from "yup";
// Images
import MButton from "../../../../BaseComponents/MButton/MButton";
import { useRef } from "react";
import axios from "axios";
const env = process.env.REACT_APP_ALL_API;
const token = JSON.parse(window.localStorage.getItem("token"));
export default function AtributPage({ infoPage, imgPage, atrPage, id }) {
  const [imgUrl, setImgUrl] = useState([]);
  const [getImg, setGetImg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [datas, setDatas] = useState(
    JSON.parse(window.localStorage.getItem("atributes")) || []
  );
  const modalselectVal = useRef();
  let formdata = new FormData();
  let collectingImgs = [];
  const initialValues = {
    ru_name: "",
    ru_price: "",
    ru_salePrice: "",
    ru_UserInfo: "",
  };
  const onSubmit = (values, { resetForm }) => {
    infoPage(false);
    imgPage(true);
    atrPage(false);
    resetForm();

    const informationResult = {
      name_uz: values.uzName,
    };
    window.localStorage.setItem(
      "information",
      JSON.stringify(informationResult)
    );
  };
  function handldelete(id) {
    let newTodo = getImg.filter((e) => e.id !== id);
    let newDelImg = imgUrl.filter((e) => e.id !== id);
    setGetImg(newTodo);
    setImgUrl(newDelImg);
  }
  const validationSchema = Yup.object({
    ru_name: Yup.string().required("Required"),
    ru_price: Yup.number().required("Required"),
    ru_salePrice: Yup.number().required("Required"),
    ru_UserInfo: Yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const findNewImg = (evt) => {
    setGetImg([
      ...getImg,
      {
        img: window.URL.createObjectURL(evt.target.files[0]),
        id: getImg.length ? getImg[getImg.length - 1].id + 1 : 0,
      },
    ]);
    if (evt.target && evt.target.files[0]) {
      setImgUrl([
        ...imgUrl,
        {
          id: imgUrl.length ? imgUrl[imgUrl.length - 1].id + 1 : 0,
          url: evt.target.files[0],
        },
      ]);
    }
    imgUrl.map((item) => collectingImgs.push(item.url));
    for (const item of collectingImgs) {
      formdata.append("image", item);
    }
    axios
      .post(`${env}media`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
        }
      })
      .catch((err) => err);
  };
  const handleSubmitSelect = (evt) => {
    evt.preventDefault();
    setShowModal(false);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
          formik.values = initialValues;
        }}
        className="mt-[23px] mb-[40px]"
      >
        <div className="flex justify-between border-b-2 pb-6 mb-6">
          <div className="w-[30%]">
            <h2 className="font-bold text-lg mb-6 text-[#2B3D90]">
              Информация и изображение{" "}
            </h2>
            <label className="text-base relative flex flex-col w-[346px]">
              Название продукта
              <input
                type="text"
                name="ru_name"
                id="name"
                placeholder="Каркасный басейн Intex прямоуголь.."
                className={
                  formik.touched.ru_name && formik.errors.ru_name
                    ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                    : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                }
                minLength="3"
                maxLength="25"
                {...formik.getFieldProps("ru_name")}
              />
              {formik.touched.ru_name && formik.errors.ru_name ? (
                <span className="text-red-600 text-xs absolute -bottom-4  left-2">
                  {formik.errors.ru_name}
                </span>
              ) : null}
            </label>
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-[#2B3D90]">Атрибуты</h2>
                <button
                  onClick={() => setShowModal(true)}
                  type="button"
                  className="text-sm text-[#109EF4]"
                >
                  + Добавить атрибуть
                </button>
              </div>
              <label className="text-base flex flex-col">
                Цена
                <input
                  type="number"
                  name="ru_price"
                  id="price"
                  placeholder="1 290 000"
                  className={
                    formik.touched.ru_price && formik.errors.ru_price
                      ? "  h-12 w-[340px] mt-3 text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600"
                      : "  h-12 w-[340px] mt-3 text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius"
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps("ru_price")}
                />
                {formik.touched.ru_price && formik.errors.ru_price ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.ru_price}
                  </span>
                ) : null}
              </label>
              <label className="text-base flex flex-col">
                Цена со скидкой
                <input
                  type="number"
                  name="ru_salePrice"
                  id="salePrice"
                  placeholder="1 290 000"
                  className={
                    formik.touched.ru_salePrice && formik.errors.ru_salePrice
                      ? "  h-12 w-[340px] mt-3 text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600 mb-3 sm:mb-6"
                      : "  h-12 w-[340px] mt-3 text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius mb-3 sm:mb-6"
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps("ru_salePrice")}
                />
                {formik.touched.ru_salePrice && formik.errors.ru_salePrice ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.ru_salePrice}
                  </span>
                ) : null}
              </label>
            </div>
          </div>
          <div className="w-[68%]">
            <label className="text-base relative flex flex-col">
              Описание продукта
              <textarea
                rows={8}
                name="ru_UserInfo"
                id="name"
                placeholder="Введите Описание продукта"
                className={
                  formik.touched.ru_UserInfo && formik.errors.ru_UserInfo
                    ? " mt-3 p-4 text-base rounded-lg outline-none border border-red-600"
                    : " mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius"
                }
                minLength="3"
                maxLength="25"
                {...formik.getFieldProps("ru_UserInfo")}
              />
              {formik.touched.ru_UserInfo && formik.errors.ru_UserInfo ? (
                <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                  {formik.errors.ru_UserInfo}
                </span>
              ) : null}
            </label>
            <div>
              <div className="flex items-center mt-6 mb-2 space-x-2">
                <h2 className="font-medium text-bold">Изображение</h2>
                <button onClick={() => setShowModal1(true)} type="button">
                  <p className="font-medium text-bold text-[#2B3D90]">
                    | Выбрать медиа
                  </p>
                </button>
              </div>
              <label className="inline-block mb-4   ">
                <input
                  required
                  onChange={findNewImg}
                  className="visually-hidden"
                  type="file"
                ></input>
                <div className="cursor-pointer w-productImgUploadWidth py-8 bg-bgUpload rounded-xl text-center">
                  <img
                    className="mx-auto mb-1"
                    src={Dounload}
                    alt="dounload"
                    width="60"
                    height="60"
                  />
                  <p>Загрузите изображения продукта</p>
                </div>
              </label>
              <div className="flex space-x-2.5">
                {getImg.map((item) => (
                  <div key={Math.random()} className="relative">
                    <img
                      className="rounded-xl object-cover w-[163px] h-[116px] shadow-lg"
                      src={item.img}
                      alt="Upload img"
                      width="163"
                      height="116"
                    />
                    <div className="flex cursor-pointer items-center space-x-2 absolute top-2.5 right-2">
                      <img
                        src={delterImgUnAdded}
                        alt="delete img"
                        width="32"
                        height="32"
                      />
                      <img
                        onClick={() => handldelete(item.id)}
                        src={delterImgAdded}
                        alt="delete img"
                        width="32"
                        height="32"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-5 mt-6 pb-6">
          <MButton BType="reject" type="reset">
            Отменить
          </MButton>
          <MButton BType="next" type="submit">
            Submit
          </MButton>
        </div>
      </form>
      <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}>
        <div className="w-[730px]">Rasmlar keladi</div>
      </Modal>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="w-[730px]">
          <div className="flex mb-6 items-center justify-between">
            <h2 className="font-bold text-[24px] leading-[32px] text-[#24283A]">
              Добавить атрибуть
            </h2>
            <button onClick={() => setShowModal(false)}>
              <img src={deleteIcon} width={32} height={32} alt="delete icon" />
            </button>
          </div>
          <Label
            datas={datas}
            setDatas={setDatas}
            gettingName={"attributes/attributes"}
            localName={"atributes"}
            renderName={"attribute_ru"}
            handleSubmitSelect={handleSubmitSelect}
          >
            <label className="flex flex-col">
              Тип атрибуты
              <select
                ref={modalselectVal}
                className="w-[330px] mt-3 rounded-lg border-2 outline-none p-4 border-[#E3E5E5]"
              >
                {datas.length > 0 &&
                  datas.map((item) => (
                    <option key={item.id}>{item.attribute_ru}</option>
                  ))}
              </select>
            </label>
            <div className="flex items-center mt-6 justify-between">
              <button
                type="reset"
                className="w-[48%] py-3 bg-[#F2F2F2] font-medium text-lg leading-[120%] rounded-xl text-[#2B3D91]"
              >
                Отменить
              </button>
              <button
                type="submit"
                className="w-[48%] py-3 bg-[#2B3D90] font-medium text-lg leading-[120%] rounded-xl text-[#fff]"
              >
                Добавить
              </button>
            </div>
          </Label>
        </div>
      </Modal>
    </div>
  );
}

import { React, useState } from "react";
import { Link } from "react-router-dom";
import HomeImg from "../../Assets/Images/HeaderImgs/HomeImg.svg";
import MButton from "../../BaseComponents/MButton/MButton";
import { Modal } from "../../components/Modal/Modal";
import Close from "../../Assets/Images/SettingsImg/close.svg";
import Upload from "../../Assets/Images/UserImgs/upload.jpg";
import Cloud from "../../Assets/Images/UserImgs/cloud.svg";
import UploadImg from "../../Assets/Images/UserImgs/upload-img.svg";
import Flag from "../../Assets/Images/SettingsImg/flag.svg";
import Visible from "../../Assets/Images/LoginImg/Visible.png";
import IsVisible from "../../Assets/Images/LoginImg/IsVisible.png";
import THead from "../../components/THead/THead";
import TBody from "../../components/TBody/TBody";
import { useEffect } from "react";

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

function UserPage() {
  const [getImg, setGetImg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // ------> Input States
  const [icon, setIcon] = useState(false);
  const [password, setPassword] = useState("");
  const [icon1, setIcon1] = useState(false);
  const [password1, setPassword1] = useState("");
  // ------> Data
  const [products, setProducts] = useState([]);
  // ------> User Informations States
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [surName, setSurName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");

  // ------> Get Products
  useEffect(() => {
    fetch(`${env}products?page=0&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.result);
      });
  }, []);

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
        textClass: "py-[5px] px-[10px] bg-[#0BCC23] rounded-[4px] text-xs text-white",
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

  // ------> Upload Img
  const uploadImg = (evt) => {
    console.log(evt.target.files[0]);
    setGetImg([
      {
        img: window.URL.createObjectURL(evt.target.files[0]),
      },
    ]);
  };

  const userDeteals = {
    name: name,
    surName: surName,
    image: getImg,
    first_name: name,
    last_name: surName,
    password: password === password1 ? password : "",
    phone: "+998" + phoneNumber,
    email: "example@gmail.com",
    address: "string",
    birth_date: birthday,
    user_image: getImg,
    status: status,
    gender: "male",
    role: role,
  };

  const userCreate = (e) => {
    e.preventDefault();

    console.log(userDeteals);
  };

  return (
    <>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={"/"}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link
          to="/userpage
      "
        >
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">Пользователи</h2>
        </Link>
      </div>
      <div className="pt-6 pb-8 px-homeContentPadding ">
        <div className="mb-4">
          <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">Пользователи</h2>
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
              <MButton BType="add bg-filterBg" type="button" onClick={() => setShowModal(true)}>
                Добавить
              </MButton>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8">
        <table className="w-full">
          <THead data={data}></THead>
          <TBody vitalData={vitalData}></TBody>
        </table>
      </div>
      {/* ---------------- Modal ------------------- */}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="w-[730px] bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-addProductColor font-bold">Добавить пользователь</h2>
            <button onClick={() => setShowModal(false)} className="rounded-md">
              <img src={Close} width={25} height={25} alt={"close_image"} />
            </button>
          </div>
          <div className="mt-6">
            <div className="flex items-center">
              <div
                className={`flex justify-center text-center w-[163px] h-[163px] rounded-[10px] ${
                  getImg.length > 0 ? "" : "border-2 border-dashed border-[#CDCDCD]"
                }`}
              >
                {getImg.length > 0 ? (
                  getImg.map((item, index) => (
                    <img
                      className="w-full object-cover rounded-[10px]"
                      key={index}
                      src={item.img}
                      alt="product_img"
                    />
                  ))
                ) : (
                  <div className="mt-12">
                    <img className="block mx-auto" src={Upload} alt="" />
                    <div className="flex items-center mt-3">
                      <img className="w-4 h-4" src={Cloud} alt="cloud_svg" />
                      <p className="ml-3 font-medium text-sm text-[#04009A]">Загрузить</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="ml-4">
                <p className="mb-4 font-medium text-[#374151] text-sm">Загрузите аватар</p>
                <label htmlFor="selectImg" className="inline-block">
                  <div className="flex justify-center items-center w-[200px] h-[44px] rounded-[8px] bg-bgUpload1 cursor-pointer">
                    <img className="w-5 h-5" src={UploadImg} alt="" />
                    <p className="ml-3 text-sm text-[#377DFF]">Загрузить фото</p>
                  </div>
                  <input
                    onChange={uploadImg}
                    className="visually-hidden"
                    id="selectImg"
                    type="file"
                  />
                </label>
              </div>
            </div>
          </div>
          <form onSubmit={userCreate} className="mt-8" autoComplete="off">
            <div className="grid grid-cols-2 gap-5">
              <label className="flex flex-col font-medium text-base text-addProductColor">
                Имя
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Введите ваше имя"
                  onChange={(e) => setName(e.target.value)}
                  className="font-normal border border-[#E3E5E5] rounded-lg outline-none mt-2 h-11 px-4"
                />
              </label>

              <label className="flex flex-col font-medium text-base text-addProductColor">
                Фамилия
                <input
                  required
                  type="text"
                  name="surname"
                  placeholder="Введите ваша фамилия"
                  onChange={(e) => setSurName(e.target.value)}
                  className="font-normal border border-[#E3E5E5] rounded-lg outline-none mt-2 h-11 px-4"
                />
              </label>

              <label className="relative text-base font-medium text-addProductColor">
                Номер телефона
                <div className="w-full bg-white flex items-center h-11 rounded-lg border border-solid text-addProductColor px-4 mt-2">
                  <img src={Flag} className="w-6 h-4" width={22} height={15} alt="site_logo" />
                  <p className="ml-1 text-base text-[#0E0F0F]">+998</p>
                  <input
                    required
                    type="number"
                    placeholder="901234567"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="font-normal outline-none w-full ml-1 h-full p-2"
                  />
                </div>
              </label>

              <label className="text-15 relative flex flex-col text-addProductColor" htmlFor="date">
                Дата рождение
                <input
                  required
                  id="date"
                  type="date"
                  placeholder="Select estimate time"
                  onChange={(e) => setBirthday(e.target.value)}
                  className={`date_bg date h-11 relative text-15 rounded-md pr-10 pl-3 mt-2 outline-none border text-black`}
                />
              </label>
              {/* ------ Select ------ */}
              <select
                required
                placeholder="Статус"
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 relative text-base rounded-md pr-10 px-3 mt-2 outline-none border text-[#B9B9B9]"
              >
                <option value="aктив" defaultChecked>
                  Актив
                </option>
                <option value="не_актив">Не актив</option>
                <option value="yдален">Удален</option>
              </select>
              <select
                required
                placeholder="Выберите роль ползователя"
                onChange={(e) => setRole(e.target.value)}
                className="h-11 relative text-base rounded-md pr-10 px-3 mt-2 outline-none border text-[#B9B9B9]"
              >
                <option value="aдмин" defaultChecked>
                  Админ
                </option>
                <option value="cупер_aдмин">Супер Админ</option>
                <option value="user">User</option>
              </select>
              {/* ------ Password ------ */}
              <div className="relative mb-5">
                <input
                  id="outlined_successs"
                  value={password}
                  type={icon ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="outlined_success_help"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-inputColor appearance-none dark:text-black dark:border-inputColor dark:focus:border-inputColor focus:outline-none focus:ring-0 focus:border-inputColor peer"
                  placeholder=" "
                  minLength={4}
                  maxLength={16}
                  required
                />
                {password ? (
                  <div
                    className="cursor-pointer absolute right-0 top-3 mr-2"
                    onClick={() => {
                      setIcon(!icon);
                    }}
                  >
                    {icon ? (
                      <img className="w-6" src={IsVisible} alt="show_image" />
                    ) : (
                      <img className="w-6" src={Visible} alt="show_image" />
                    )}
                  </div>
                ) : (
                  ""
                )}
                <label
                  htmlFor="outlined_successs"
                  className="absolute text-base text-inputPleacholderColor dark:text-inputPleacholderColor duration-300 transform -translate-y-4 scale-75 top-[5px] z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Потвердите пароль
                </label>
              </div>
              <div className="relative mb-5">
                <input
                  id="outlined_successs"
                  value={password1}
                  type={icon1 ? "text" : "password"}
                  onChange={(e) => setPassword1(e.target.value)}
                  aria-describedby="outlined_success_help"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-inputColor appearance-none dark:text-black dark:border-inputColor dark:focus:border-inputColor focus:outline-none focus:ring-0 focus:border-inputColor peer"
                  placeholder=" "
                  minLength={4}
                  maxLength={16}
                  required
                />
                {password1 ? (
                  <div
                    className="cursor-pointer absolute right-0 top-3 mr-2"
                    onClick={() => {
                      setIcon1(!icon1);
                    }}
                  >
                    {icon1 ? (
                      <img className="w-6" src={IsVisible} alt="show_image" />
                    ) : (
                      <img className="w-6" src={Visible} alt="show_image" />
                    )}
                  </div>
                ) : (
                  ""
                )}
                <label
                  htmlFor="outlined_successs"
                  className="absolute text-base text-inputPleacholderColor dark:text-inputPleacholderColor duration-300 transform -translate-y-4 scale-75 top-[5px] z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Пароль
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-[#F2F2F2] w-80 py-3 rounded-xl text-russuanColor font-medium text-lg"
              >
                Отменить
              </button>
              <button
                type="submit"
                className="bg-russuanColor w-80 py-3 rounded-xl text-[#fff] font-medium text-lg"
              >
                {"Сохранить"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default UserPage;

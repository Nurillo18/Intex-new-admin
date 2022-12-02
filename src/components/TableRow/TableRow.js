import axios from "axios";
import React, { useState } from "react";
import TableData from "../TableData/TableData";
import MLabel from "../../BaseComponents/MLabel/MLabel";
// Images
import ThreeDotsSvg from "../../Assets/Images/ProductsImgs/threedots.svg";
import Trash from "../../Assets/Images/ProductsImgs/trash_1.svg";
import { useSelector } from "react-redux";
import { searchProduction } from "../../redux/siteDataReducer";

const env = process.env.REACT_APP_ALL_API;

export default function TableRow({
  children,
  styles,
  data,
  isChecked,
  refresh,
}) {

  const [checker, setChecker] = useState(false);
  const [showModal, setshowModal] = useState(false);

  const token = JSON.parse(window.localStorage.getItem("token"));



  const handleCheck = (e) => {
    if (e.target.checked) {
      setChecker(true);
      e.target.checked = true;
    } else {
      setChecker(false);
      e.target.checked = false;
    }
  };

  // --- Delete Row
  const DeleteItems = (id) => {
    axios
      .delete(`${env}products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // --- Colse
  const close = (
    <svg
      className="flex items-center justify-center object-fill"
      width={20}
      height={20}
      viewPort="0 0 12 12"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="1" y1="15" x2="15" y2="1" stroke="black" strokeWidth="2" />
      <line x1="1" y1="1" x2="15" y2="15" stroke="black" strokeWidth="2" />
    </svg>
  );
  return (
    <tr className={`flex items-center border-b ${styles}`}>
      {children ? (
        children
      ) : (
        <>
          <TableData styles="w-11 pr-3 justify-center">
            <input
              className="inputs w-4 h-4"
              type="checkbox"
              checked={
                checker === true && isChecked === false
                  ? true
                  : checker === false && isChecked === false
                  ? false
                  : checker === false && isChecked === true
                  ? true
                  : checker === true && isChecked === true
                  ? true
                  : true
              }
              onChange={(e) => handleCheck(e)}
            />
          </TableData>
          <TableData styles="w-[66px]">{data.id}</TableData>
          <TableData
            styles="w-[300px] truncate whitespace-nowrap overflow-hidden text-ellipsis"
            image={true}
          >
            {data.name_uz}
          </TableData>
          <TableData styles="w-[153px]">{data.price}</TableData>
          <TableData styles="w-[153px]">{data.discount_price} сум</TableData>
          <TableData styles="w-[99px]">4</TableData>
          <TableData styles="w-[147px]">220x150x60см</TableData>
          <TableData styles="w-[118px]">1 622 л</TableData>
          <TableData styles="w-[140px]">
            <MLabel type={`label_${data.status_en}`}>{data.status_ru}</MLabel>
          </TableData>
          <TableData styles="w-[95px] pr-3 justify-center relative">
            <button
              className="mx-auto px-8 py-2"
              onClick={() => setshowModal(true)}
            >
              <img src={ThreeDotsSvg} alt="three dots icon" />
            </button>
            {showModal ? (
              <ul className="bg-white w-[160px] absolute border rounded-lg shadow-lg space-y-2 z-40 right-0">
                <div className="relative">
                  <button
                    onClick={() => DeleteItems(data.id)}
                    type="button"
                    className="flex items-center relative px-2 py-[10px]"
                  >
                    <img
                      className="mr-2"
                      src={Trash}
                      alt="just a icon to edit"
                    />
                    <span className="block">Удалить</span>
                  </button>
                  <span
                    onClick={() => setshowModal(false)}
                    className="ml-6 absolute top-[6px] cursor-pointer right-0 px-3 py-2"
                  >
                    {close}
                  </span>
                </div>
              </ul>
            ) : null}
          </TableData>
        </>
      )}
    </tr>
  );
}

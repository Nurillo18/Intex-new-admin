import React from "react";
import Dots from "../../Assets/Images/TableImgs/dots.svg";
import Edit from "../../Assets/Images/TableImgs/edit.svg";
import Delete from "../../Assets/Images/TableImgs/trash.svg";
import "./TBody.css";
import CrudModal from "../Modal/Modal";
import { useRef } from "react";
import { useState } from "react";
import MFilter from "../../BaseComponents/MFilter/MFilter";

export default function TBody({ vitalData, DeleteItem }) {
  const modalRef = useRef(null);
  const [bnnma, setBnnma] = useState(false);
  const handleModal = (e, i) => {
    if (e.target.matches(`.edit_dots${i}`)) {
      // e?.target?.parentNode?.classList.add("relative");
      e?.target?.nextElementSibling?.classList.remove("hidden");
      e?.target?.nextElementSibling?.classList.add("grid");
    } else {
      // modalRef.current.classList.remove("grid");

      // modalRef.current.classList.add("hidden");
      setBnnma(true);
      console.log(bnnma);
    }
  };
  return (
    <tbody className="bg-white">
      <tr className="h-2.5 bg-[#E5E5E5]"></tr>
      {vitalData.length > 0 &&
        vitalData.map((el, i) => {
          return (
            <tr
              className="flex items-center border-t last:border-b"
              key={i}
              onClick={(e) => handleModal(e, i)}
            >
              <td className="w-11 flex justify-center">
                <input
                  className="w-[18px] h-[18px] cursor-pointer"
                  type="checkbox"
                  name={`input${i}`}
                />
              </td>
              {el.map((a, i) => {
                return (
                  <td className={`py-3 pl-3 truncate ${a.style}`} key={i}>
                    {a.image ? (
                      <img
                        className="w-6 h-6 rounded-full mr-[6px]"
                        src="https://via.placeholder.com/42x38"
                        alt="basseyn"
                      />
                    ) : null}
                    {typeof a.title === "object" ? (
                      a.title.map((el, i) =>
                        el.length ? (
                          <MFilter key={i}>{el}</MFilter>
                        ) : (
                          <span key={i}></span>
                        )
                      )
                    ) : (
                      <span
                        className={`${a.textClass} ${
                          a?.label ? a?.label : "text-[#24283A] text-sm"
                        } truncate  text-sm`}
                      >
                        {a.title}
                      </span>
                    )}
                  </td>
                );
              })}
              <td className="flex ml-10   flex-grow w-[95px] py-[17px] cursor-pointer relative">
                <img className={`edit_dots${i}`} src={Dots} alt="three dots" />

                <div
                  ref={modalRef}
                  id="oram"
                  className={`absolute ${
                    bnnma ? "hidden" : "grid"
                  } hidden left-[10%] top-0 bottom-0 grid-cols-1 text-start border bg-white p-1 space-y-1 rounded-[5px] shadow-[0px_12px_23px_rgba(150, 150, 150, 0.1)]`}
                >
                  <button className="flex items-center text-xs">
                    <img src={Edit} alt="" width={16} height={17} />
                    Изменить
                  </button>
                  <button
                    className="flex items-center text-xs"
                    onClick={DeleteItem}
                  >
                    <img src={Delete} alt="" width={16} height={17} />
                    Удалить
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
    </tbody>
  );
}

import React from "react";
import EditModal from "../EditionModal/Modal";
import MFilter from "../../BaseComponents/MFilter/MFilter";
import axios from "axios";
import { useState } from "react";

// ------> Css
import "./TBody.css";
import { useEffect } from "react";

const env = process.env.REACT_APP_ALL_API;

export default function TBody({ vitalData, urlRoute }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(vitalData);
  }, [vitalData]);
  const token = JSON.parse(window.localStorage.getItem("token"));
  const handleDelete = (e, id) => {
    if (e.target.matches(".deleteBtn")) {
      axios.delete(`${env}${urlRoute}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData([...data.filter((item) => item.mainId !== id)]);
    }
  };

  const handleScroll = () => {
    console.log("scrolling");
  };

  return (
    <tbody className="bg-white" onScroll={handleScroll}>
      <tr className="h-2.5 bg-[#E5E5E5]"></tr>
      {data.length > 0 &&
        data.map((el, i) => {
          return (
            <tr
              key={i}
              className="flex items-center border-t last:border-b"
              onClick={(e) => handleDelete(e, el.mainId)}
            >
              <td className="w-11 flex justify-center">
                <input
                  className="w-[18px] h-[18px] cursor-pointer"
                  type="checkbox"
                  name={`input${i}`}
                />
              </td>
              {el?.data.map((a, i) => {
                return (
                  <td key={i} className={`flex items-center py-3 pl-3 cursor-pointer ${a.style}`}>
                    {a.image ? (
                      <img
                        className="w-6 h-6 rounded-full mr-[6px]"
                        src={a.image || "https://via.placeholder.com/42x38"}
                        alt="basseyn"
                      />
                    ) : null}

                    {typeof a.title === "object" && a.title != null ? (
                      a?.title?.map((el, i) =>
                        el.length ? <MFilter key={i}>{el}</MFilter> : <span key={i}></span>)) : (
                      <span
                        className={`${a.textClass} ${
                          a?.label ? a?.label : "text-[#24283A] text-sm"
                        } truncate text-sm`}
                      >
                        {a?.title}
                      </span>
                    )}
                  </td>
                );
              })}
              <EditModal modalId={i}></EditModal>
            </tr>
          );
        })}
    </tbody>
  );
}

import React from "react";

import EditModal from "../EditionModal/Modal";

import "./TBody.css";
import CrudModal from "../Modal/Modal";
import { useRef } from "react";
import { useState } from "react";
import MFilter from "../../BaseComponents/MFilter/MFilter";

export default function TBody({ vitalData }) {


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
                  <td className={`py-3 pl-3 ${a.style}`} key={i}>
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

              <EditModal modalId={i}></EditModal>

            </tr>
          );
        })}
    </tbody>
  );
}

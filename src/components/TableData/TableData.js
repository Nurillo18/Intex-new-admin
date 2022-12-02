import React from "react";
import MainProduct from "../../Assets/Images/ProductsImgs/main.png";

export default function TableData({ children, image, styles, productImage }) {
  const env = process.env.REACT_APP_ALL_API;
  // console.log(productImage);
  return (
    <td
      className={`flex font-medium leading-6 pl-3 items-center ${
        styles ? styles : ""
      }`}
    >
      {image ? (
        <img
          className="mr-2"
          src={MainProduct}
          alt="Product main"
          width={42}
          height={38}
        />
      ) : (
        ""
      )}
      {children}
    </td>
  );
}

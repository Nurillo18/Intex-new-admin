import React from "react";
import Edit from "../../Assets/Images/TableImgs/edit.svg";
import Delete from "../../Assets/Images/TableImgs/trash.svg";
import Dots from "../../Assets/Images/TableImgs/dots.svg";

export default function EditModal({ modalId }) {
  const [isModalOpened, setisModalOpened] = React.useState(false);

  // ------> Show Modal
  const handleModal = () => {
    setisModalOpened(true);
  };

  // ------> Window Listener
  window.addEventListener("click", (e) => {
    const { name } = e.target;
    if (name !== `modalDots${modalId}`) {
      setisModalOpened(false);
    }
  });

  // ------> Delete Row

  return (
    <td className="flex justify-center ml-10 w-[65px] cursor-pointer relative">
      <img
        className="py-4 px-7"
        src={Dots}
        alt="three dots"
        onClick={handleModal}
        name={`modalDots${modalId}`}
      />
      <div
        id="oram"
        className={`${
          isModalOpened ? "grid" : "hidden"
        } absolute -top-[5px] right-[65px] border w-[126px] !bg-white z-5 rounded-[5px] py-1 px-3`}
      >
        <button className="flex items-center text-xs py-1">
          <img className="w-6 h-6 mr-1" src={Edit} alt="edit-icon" />
          Изменить
        </button>
        <button className="deleteBtn flex items-center text-xs py-1">
          <img
            className="deleteBtn w-6 h-6 mr-1"
            src={Delete}
            alt="delete-icon"
          />
          Удалить
        </button>
      </div>
    </td>
  );
}

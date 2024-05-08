import React from "react";
import "./Modal.scss";
import { IoMdClose } from "react-icons/io";

const Modal = ({ user, handleClickModal }) => {
  const { fullName, date, gender, address, phoneNumber } = user;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={handleClickModal}></div>
      <div className="modal__user">
        <div className="modal__user__img"></div>
        <div className="modal__user__info">
          <h2 className="modal__user__title">{fullName}</h2>
          <p className="modal__user__text">Date: {date}</p>
          <p className="modal__user__text">Gender: {gender}</p>
          <p className="modal__user__text">Address: {address}</p>
          <p className="modal__user__text">Phone: {phoneNumber}</p>
          <button className="modal__user__btn" onClick={handleClickModal}>
            <IoMdClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

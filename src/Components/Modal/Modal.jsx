import React from "react";
import s from "./Modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ img, handleBackdropClick }) => {
  return (
    <div class={s.Overlay} onClick={handleBackdropClick}>
      <div class={s.modal}>
        <img src={img.largeImageURL} alt={img.id} />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  img: PropTypes.object,
  handleBackdropClick: PropTypes.func,
};

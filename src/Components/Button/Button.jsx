import React from "react";
import s from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ handleButton }) => {
  return (
    <button className={s.Button} type="button" onClick={handleButton}>
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = { handleButton: PropTypes.func };

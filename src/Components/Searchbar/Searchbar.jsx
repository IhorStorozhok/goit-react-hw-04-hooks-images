import React, { useState } from "react";
import s from "./Searchbar.module.css";
import PropTypes from "prop-types";

const Searchbar = ({ submit }) => {
  const [inputValue, setInputValue] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    submit(inputValue);
    // this.setState({ inputValue: "" });
  };

  const getInputValue = (e) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handlerSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={getInputValue}
            value={inputValue}
            className={s.SearchFormInput}
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};

export default Searchbar;

Searchbar.propTypes = { submit: PropTypes.func };

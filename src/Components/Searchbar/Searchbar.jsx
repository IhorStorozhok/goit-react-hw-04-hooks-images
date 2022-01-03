import React from "react";
import s from "./Searchbar.module.css";
import PropTypes from "prop-types";

class Searchbar extends React.Component {
  state = { inputValue: "" };

  handlerSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.inputValue);
    // this.setState({ inputValue: "" });
  };

  getInputValue = (e) => {
    this.setState({ inputValue: e.currentTarget.value });
  };

  render() {
    return (
      <>
        <header className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={this.handlerSubmit}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              onChange={this.getInputValue}
              value={this.state.inputValue}
              className={s.SearchFormInput}
              type="text"
              autocomplete="off"
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = { submit: PropTypes.func };

import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Spinner extends React.Component {
  state = {};
  render() {
    return (
      <div className="loaderContainer">
        <Loader
          type="Bars"
          color="#00BFFF"
          height={200}
          width={200}
          // timeout={1000} //3 secs
          visible={true}
        />
      </div>
    );
  }
}

export default Spinner;

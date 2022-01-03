import React from "react";
import { animateScroll as scroll } from "react-scroll";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Button from "./Components/Button/Button";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Spinner from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import Searchbar from "./Components/Searchbar/Searchbar";
import findImages from "./Components/Api/Api";

class App extends React.Component {
  state = {
    images: [],
    status: "idle",
    queryName: "",
    chosenImgId: "",
    showModal: false,
    page: 1,
  };

  //starting upload
  componentDidMount() {
    const { state, toster } = this;

    if (state.images.length === 0) {
      this.setState({ status: "pending" });
      findImages("home", 1)
        .then((arr) => {
          this.setState({ images: arr, status: "resolved" });
        })
        .catch((error) => {
          this.setState({ status: "reject" });
          toster();
        });
    }

    //close modal by esc

    const onCloseModal = (e) => {
      if (e.key === "Escape" && this.state.showModal === true) {
        this.setState({ showModal: false });
      }
    };

    window.addEventListener("keydown", onCloseModal);
  }

  //////////Modal`s methods///////////////

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  openModal = (e) => {
    const imgId = e.target.id;
    const imgIndex = this.state.images.findIndex((obj) => {
      return obj.id == imgId;
    });
    this.setState({ chosenImgId: imgIndex });
    this.toggleModal();
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.toggleModal();
    }
  };

  //////////auto scroling///////////////

  scrollToBottom() {
    scroll.scrollToBottom();
  }

  scrollToUp() {
    scroll.scrollToTop();
  }

  //////////take value from input///////////////
  getQuery = (queryName) => {
    this.setState({ queryName: queryName, status: "pending" });

    findImages(queryName, 1)
      .then((arr) => {
        this.setState((prevState) => {
          return { images: [...arr], page: 1, status: "resolved" };
        });
      })
      .catch((error) => {
        this.setState({ status: "reject" });
        this.toster();
      });
  };

  //////////Load more images///////////////
  loadMore = () => {
    this.setState({ status: "pending" });
    findImages(
      this.state.queryName,
      this.state.page === 1 ? 2 : this.state.page
    )
      .then((arr) => {
        this.setState((prevState) => {
          return {
            images: [...prevState.images, ...arr],
            page: prevState.page + 1,
            status: "resolved",
          };
        });
      })
      .catch((error) => {
        this.setState({ status: "reject" });
        this.toster();
      });
    this.scrollToBottom();
  };

  //////////Alert///////////////
  toster = () => {
    toast.error("Ooops Let`s try it again");
  };

  render() {
    const { images, status, queryName, chosenImgId, showModal } = this.state;
    const { getQuery, openModal, loadMore, handleBackdropClick } = this;
    return (
      <>
        <Searchbar submit={getQuery}></Searchbar>
        {images.length > 0 && status === "resolved" && (
          <ImageGallery images={images} onClickItem={openModal}></ImageGallery>
        )}

        {status === "pending" && <Spinner />}

        {images.length % 12 === 0 &&
          images.length !== 0 &&
          queryName !== "" && <Button handleButton={loadMore}></Button>}

        {showModal && (
          <Modal
            img={images[chosenImgId]}
            handleBackdropClick={handleBackdropClick}
          />
        )}

        <button className="upperButton" type="button" onClick={this.scrollToUp}>
          Go up!
        </button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
      </>
    );
  }
}

export default App;

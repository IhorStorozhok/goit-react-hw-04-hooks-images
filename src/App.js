import React, { useState, useEffect } from "react";
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

const App = () => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [queryName, setQueryName] = useState("");
  const [chosenImgId, setChosenImgId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  // state = {
  //   images: [],
  //   status: "idle",
  //   queryName: "",
  //   chosenImgId: "",
  //   showModal: false,
  //   page: 1,
  // };

  //starting upload

  useEffect(() => {
    if (images.length === 0) {
      setStatus("pending");
      findImages("home", 1)
        .then((arr) => {
          setImages(arr);
          setStatus("resolved");
        })
        .catch((error) => {
          setStatus("reject");
          toster();
        });
    }
  }, []);

  //close modal by esc

  const onCloseModal = (e) => {
    if (e.key === "Escape" && showModal === true) {
      setShowModal(false);
    }
  };

  window.addEventListener("keydown", onCloseModal);

  //////////Modal`s methods///////////////

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = (e) => {
    const imgId = e.target.id;
    const imgIndex = images.findIndex((obj) => {
      return obj.id == imgId;
    });
    setChosenImgId(imgIndex);
    toggleModal();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  //////////auto scroling///////////////

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const scrollToUp = () => {
    scroll.scrollToTop();
  };

  //////////take value from input///////////////
  const getQuery = (queryName) => {
    setQueryName(queryName);
    setStatus("pending");

    findImages(queryName, 1)
      .then((arr) => {
        setImages([...arr]);
        setPage(1);
        setStatus("resolved");
        // this.setState((prevState) => {
        //   return { images: [...arr], page: 1, status: "resolved" };
        // });
      })
      .catch((error) => {
        setStatus("reject");
        toster();
      });
  };

  //////////Load more images///////////////
  const loadMore = () => {
    setStatus("pending");

    findImages(queryName, page + 1)
      .then((arr) => {
        const newArr = [...images, ...arr];

        setPage(page + 1);
        setImages(newArr);
        setStatus("resolved");
      })
      .catch((error) => {
        setStatus("reject");
        toster();
      });
    scrollToBottom();
  };

  //////////Alert///////////////
  function toster() {
    toast.error("Ooops Let`s try it again");
  }

  return (
    <>
      <Searchbar submit={getQuery}></Searchbar>
      {images.length > 0 && status === "resolved" && (
        <ImageGallery images={images} onClickItem={openModal}></ImageGallery>
      )}

      {status === "pending" && <Spinner />}

      {images.length % 12 === 0 && images.length !== 0 && queryName !== "" && (
        <Button handleButton={loadMore}></Button>
      )}

      {showModal && (
        <Modal
          img={images[chosenImgId]}
          handleBackdropClick={handleBackdropClick}
        />
      )}

      <button className="upperButton" type="button" onClick={scrollToUp}>
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
};

export default App;

import React, { useState } from "react";
import s from "./ImageGallery.module.css";
import GalleryItem from "../ImageGalleryItems/ImageGalleryItems";
import PropTypes from "prop-types";

const ImageGallery = ({ images, onClickItem }) => {
  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map((el) => {
          return (
            <>
              <GalleryItem item={el} key={el.id} onClickItem={onClickItem} />
            </>
          );
        })}
      </ul>
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
  onClickItem: PropTypes.func,
};

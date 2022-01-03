import React from "react";
import s from "./ImageGalleryItems.module.css";
import PropTypes from "prop-types";

const ImageGalleryItems = ({ item, onClickItem }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={onClickItem}>
      <img
        src={item.webformatURL}
        alt={item.tags}
        id={item.id}
        className={s.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItems;

ImageGalleryItems.propTypes = {
  item: PropTypes.object,
  key: PropTypes.number,
  onClickItem: PropTypes.func,
};

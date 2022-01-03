import React, { Children } from "react";
import s from "./ImageGallery.module.css";
import GalleryItem from "../ImageGalleryItems/ImageGalleryItems";
import PropTypes from "prop-types";

class ImageGallery extends React.Component {
  state = {};

  render() {
    return (
      <>
        <ul className={s.ImageGallery}>
          {this.props.images.map((el) => {
            return (
              <>
                <GalleryItem
                  item={el}
                  key={el.id}
                  onClickItem={this.props.onClickItem}
                />
              </>
            );
          })}
        </ul>
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
  onClickItem: PropTypes.func,
};

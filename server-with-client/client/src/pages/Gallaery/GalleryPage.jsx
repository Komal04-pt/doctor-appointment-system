import React, { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { photos } from "./GalleryData";
import "./GalleryPage.css";

const GalleryPage = () => {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="gallery-hero">
        <div className="gallery-hero-content">
          <span className="gallery-hero-badge">✦ Our Facilities</span>
          <h1>Gallery</h1>
          <p>
            Take a look inside CR Global Hospital's world-class facilities
            and patient-friendly spaces.
          </p>
        </div>
      </div>

      <div className="container mb-5 mt-5">
        <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={200}
          spacing={8}
          onClick={({ index: current }) => setIndex(current)}
          render={{
            image: (props, { photo }) => (
              <img
                {...props}
                style={{
                  ...props.style,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.filter = "brightness(0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "brightness(1)";
                }}
              />
            ),
          }}
        />
      </div>

      <div className="lightbox">
        <Lightbox
          index={index}
          slides={photos}
          open={index >= 0}
          close={() => setIndex(-1)}
        />
      </div>
    </>
  );
};

export default GalleryPage;
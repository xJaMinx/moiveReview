import React, { useEffect, useState } from "react";

const GallerySection = ({ galleryImages, movieTitle }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isOpen = selectedIndex !== null;
  const currentImage =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  const handleOpen = (index) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev === 0 ? galleryImages.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev === galleryImages.length - 1 ? 0 : prev + 1
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, galleryImages.length]);

  return (
    <>
      <div className="gallery-section">
        <h3 className="gallery-title">이미지 갤러리</h3>

        <div className="gallery-grid">
          {galleryImages.length > 0 ? (
            galleryImages.map((image, index) => (
              <button
                type="button"
                className="gallery-item"
                key={image.file_path || index}
                onClick={() => handleOpen(index)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
                  alt={`${movieTitle} 스틸컷 ${index + 1}`}
                />
              </button>
            ))
          ) : (
            <p className="gallery-empty">표시할 이미지가 없습니다.</p>
          )}
        </div>
      </div>

      {isOpen && currentImage && (
        <div className="gallery-modal" onClick={handleClose}>
          <button
            type="button"
            className="gallery-close-button"
            onClick={handleClose}
          >
            ×
          </button>

          <button
            type="button"
            className="gallery-nav-button gallery-prev-button"
            onClick={handlePrev}
          >
            ←
          </button>

          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${currentImage.file_path}`}
              alt={`${movieTitle} 큰 이미지 ${selectedIndex + 1}`}
              className="gallery-modal-image"
            />
          </div>

          <button
            type="button"
            className="gallery-nav-button gallery-next-button"
            onClick={handleNext}
          >
            →
          </button>
        </div>
      )}
    </>
  );
};

export default GallerySection;
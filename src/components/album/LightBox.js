import React from "react";

const Lightbox = ({ imgSrc, open, closeLightbox }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <img
        src={imgSrc}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={closeLightbox}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1010,
        }}
      >
        닫기
      </button>
    </div>
  );
};

export default Lightbox;

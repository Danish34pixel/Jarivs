import React from "react";

const Cloudinary3DViewer = () => {
  return (
    <div className="model-viewer-container">
      <h2 className="viewer-title">3D Model Viewer</h2>
      <div className="sketchfab-embed-wrapper">
        <iframe
          title="Tesla - Cybertruck"
          className="model-iframe"
          frameBorder="0"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          src="https://sketchfab.com/models/5a86defda4b24836a504fe5e597fdb17/embed"
          style={{
            width: "100%",
            height: "400px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
        <div
          className="model-info"
          style={{
            fontSize: "13px",
            margin: "10px 0",
            color: "#4A4A4A",
            textAlign: "center",
          }}
        >
          <a
            href="https://sketchfab.com/3d-models/tesla-cybertruck-5a86defda4b24836a504fe5e597fdb17"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: "bold",
              color: "#1CAAD9",
              textDecoration: "none",
            }}
          >
            Tesla - Cybertruck
          </a>
          {" by "}
          <a
            href="https://sketchfab.com/bubelrobert"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: "bold",
              color: "#1CAAD9",
              textDecoration: "none",
            }}
          >
            bubelrobert
          </a>
          {" on "}
          <a
            href="https://sketchfab.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: "bold",
              color: "#1CAAD9",
              textDecoration: "none",
            }}
          >
            Sketchfab
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cloudinary3DViewer;

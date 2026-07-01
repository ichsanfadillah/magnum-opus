import React, { useEffect, useRef } from "react";

// src/components/Window.jsx
export default function Window({ app, onClose }) {
  const windowRef = useRef(null);

  useEffect(() => {
    const windowDiv = windowRef.current;

    const headerElement = windowDiv.querySelector(".window-header");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - windowDiv.offsetLeft;
      offsetY = e.clientY - windowDiv.offsetTop;
    };

    const handleMouseMovement = (e) => {
      if (!isDragging) return;
      windowDiv.style.left = `${e.clientX - offsetX}px`;
      windowDiv.style.top = `${e.clientY - offsetY}px`;

      const handleMouseRelease = () => {
        isDragging = false;
      };

      headerElement.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMovement);
      window.addEventListener("mouseup", handleMouseRelease);
    };
  }, []);

  return (
    <div
      ref={windowRef}
      className="window-frame"
      style={{
        position: "absolute",
        left: `${app.x}px`,
        top: `${app.y}px`,
        width: `${app.width}px`,
        height: `${app.height}px`,
        zIndex: app.zIndex,
      }}
    >
      {/* The Header Titlebar */}
      <div className="window-header">
        <span className="window-title">{app.title}</span>
        <div className="window-controls">
          <button
            className="ctrl-btn close-btn"
            onClick={() => onClose(app.id)}
          >
            X
          </button>
        </div>
      </div>

      {/* The App Inside */}
      <div className="window-content">
        {/* Your future iframes or components will load right here! */}
        <p style={{ color: "black", padding: "10px" }}>
          Hello from inside {app.title}!
        </p>
      </div>
    </div>
  );
}

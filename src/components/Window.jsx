import React, { useEffect, useRef } from "react";

// src/components/Window.jsx
export default function Window({ app, onClose, onFocus }) {
  const windowRef = useRef(null);

  useEffect(() => {
    const windowDiv = windowRef.current;
    const headerElement = windowDiv.querySelector(".window-header");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // 1. Isolated mouse down configuration
    const handleMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - windowDiv.offsetLeft;
      offsetY = e.clientY - windowDiv.offsetTop;
    };

    // 2. Isolated mouse move calculation
    const handleMouseMovement = (e) => {
      if (!isDragging) return;

      let targetX = e.clientX - offsetX;
      let targetY = e.clientY - offsetY;

      const topBar = document.querySelector(".top-bar");
      const topBarHeight = topBar ? topBar.offsetHeight : 0;

      const maxX = window.innerWidth - windowDiv.offsetWidth;
      const maxY = window.innerHeight - windowDiv.offsetHeight;

      targetX = Math.max(0, Math.min(targetX, maxX));
      targetY = Math.max(topBarHeight, Math.min(targetY, maxY));

      windowDiv.style.left = `${targetX}px`;
      windowDiv.style.top = `${targetY}px`;
    };

    // 3. Isolated mouse up reset (Completely outside the movement block now!)
    const handleMouseRelease = () => {
      isDragging = false;
    };

    // 4. Flat event listeners activating the functions independently
    headerElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMovement);
    window.addEventListener("mouseup", handleMouseRelease);

    return () => {
      headerElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMovement);
      window.removeEventListener("mouseup", handleMouseRelease);
    };
  }, []);

  return (
    <div
      ref={windowRef}
      className="window-frame"
      onMouseDown={() => onFocus(app.id)}
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

import { useState } from "react";
import { wallpaperlist } from "../data/wallpapers";
import TopBar from "./TopBar";
import Window from "./Window"; // 1. Import your window wrapper

export default function AppCoordinator() {
  const [currentWallpaper, setWallpaper] = useState(wallpaperlist[0]);
  const [openWindows, setOpenWindows] = useState([]);

  // 2. The Trigger: Generates a new app instance object
  const launchApp = (id, title) => {
    // Check if the app is already open so we don't open duplicates
    if (openWindows.some((app) => app.id === id)) return;

    const newAppWindow = {
      id: id,
      title: title,
      x: 150, // Screen placement
      y: 150,
      width: 400,
      height: 300,
      zIndex: 10,
    };

    setOpenWindows([...openWindows, newAppWindow]);
  };

  const focusApp = (id) => {
    setOpenWindows((prevWindows) => {
      //1.
      const maxZ = prevWindows.reduce(
        (max, app) => Math.max(max, app.zIndex || 10),
        10,
      );

      //2.
      return prevWindows.map((app) => {
        if (app.id === id) {
          return { ...app, zIndex: maxZ + 1 };
        }
        return app;
      });
    });
  };

  // 3. The Closer: Filters an app window out of the state array entirely
  const closeApp = (id) => {
    setOpenWindows(openWindows.filter((app) => app.id !== id));
  };

  return (
    <div
      className="desktop-shell"
      style={{
        background:
          currentWallpaper.type === "image"
            ? `url(${currentWallpaper.value})`
            : currentWallpaper.value,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TopBar />

      {/* A temporary desktop app launcher icon/button */}
      <button
        className="mock-launcher"
        onClick={() => launchApp("music-app", "🎵 Music Studio")}
        style={{
          position: "absolute",
          top: "100px",
          left: "50px",
          padding: "10px",
        }}
      >
        Music Studio
      </button>

      <button
        className="mock-launcher"
        onClick={() => launchApp("Calculator", "Calculator")}
        style={{
          position: "absolute",
          top: "100px",
          left: "200px",
          padding: "10px",
        }}
      >
        Calculator
      </button>

      {/* The Dynamic Workspace Window Loop */}
      <div
        className="desktop-workspace"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {openWindows.map((app) => (
          <Window
            key={app.id}
            app={app}
            onClose={closeApp}
            onFocus={focusApp}
          />
        ))}
      </div>
    </div>
  );
}

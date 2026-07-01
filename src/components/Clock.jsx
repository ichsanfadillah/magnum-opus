import { useState, useEffect } from "react";

export default function Clock() {
  // 1. Initialize state with a readable time string
  const [time, setTime] = useState("");

  useEffect(() => {
    // Helper function to update our state with the local time layout
    const updateClock = () => {
      const now = new Date();

      // Look up 'toLocaleTimeString' parameters to customize 12-hour or 24-hour display!
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    };

    // Run it instantly so there isn't a 1-second blank flash
    updateClock();

    // 2. Set up a browser interval to trigger every single second (1000ms)
    const timerId = setInterval(updateClock, 1000);

    // 3. The CRITICAL Cleanup: clears the timer from the browser engine memory
    return () => clearInterval(timerId);
  }, []);

  return (
    <button
      className="clock-btn"
      onClick={() => console.log("Open Calendar clicked!")}
    >
      {time}
    </button>
  );
}

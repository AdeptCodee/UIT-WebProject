import { useEffect } from "react";

function MouseTracker() {
  useEffect(() => {
    const handleMove = (e) => {
      console.log("X:", e.clientX, "Y:", e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return <div>Tracking mouse...</div>;
}

export default MouseTracker;

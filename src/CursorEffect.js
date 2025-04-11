import React, { useEffect, useRef } from "react";

const TouchCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let drawing = false;

    const startTouch = (e) => {
      drawing = true;
      const touch = e.touches[0];
      ctx.beginPath();
      ctx.moveTo(touch.clientX, touch.clientY);
    };

    const moveTouch = (e) => {
      if (!drawing) return;
      const touch = e.touches[0];
      ctx.lineTo(touch.clientX, touch.clientY);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const endTouch = () => {
      drawing = false;
      ctx.closePath();
    };

    canvas.addEventListener("touchstart", startTouch);
    canvas.addEventListener("touchmove", moveTouch);
    canvas.addEventListener("touchend", endTouch);

    return () => {
      canvas.removeEventListener("touchstart", startTouch);
      canvas.removeEventListener("touchmove", moveTouch);
      canvas.removeEventListener("touchend", endTouch);
    };
  }, []);

  return (
    <canvas
      id="touch-canvas"
      ref={canvasRef}
    ></canvas>
  );
};

export default TouchCanvas;

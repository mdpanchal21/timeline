import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function drawVerticalLines(canvas, numberOfLines) {
  const ctx = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const lineSpacing = canvasWidth / (numberOfLines + 1);

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing

  for (let i = 1; i <= numberOfLines; i++) {
    const x = i * lineSpacing;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
}

function App() {
  const rightCanvasRef = useRef(null);
  const leftSVGRef = useRef(null);
  const rightCtxRef = useRef(null);
  const scaleRef = useRef(1);

  useEffect(() => {
    const rightCanvas = rightCanvasRef.current;
    const rightCtx = rightCanvas.getContext('2d');
    rightCtxRef.current = rightCtx;

    // Initial setup
    rightCanvas.width = rightCanvas.clientWidth;
    rightCanvas.height = rightCanvas.clientHeight;
    drawVerticalLines(rightCanvas, 5);

    // Event listener for right canvas only
    rightCanvas.addEventListener('wheel', handleWheel);

    return () => {
      rightCanvas.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const svg = leftSVGRef.current;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.textContent = 'media buffer';
    text.setAttribute('x', '58');
    text.setAttribute('y', '25');
    text.setAttribute('font-family', 'Arial');
    text.setAttribute('font-size', '15px');
    text.setAttribute('fill', 'grey');
    svg.appendChild(text);
  }, []);


  useEffect(() => {
    const svg = leftSVGRef.current;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.textContent = 'video buffer (main)';
    text.setAttribute('x', '20');
    text.setAttribute('y', '65');
    text.setAttribute('font-family', 'Arial');
    text.setAttribute('font-size', '15px');
    text.setAttribute('fill', 'grey');
    svg.appendChild(text);
  }, []);

  useEffect(() => {
    const svg = leftSVGRef.current;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.textContent = 'audio buffer (main)';
    text.setAttribute('x', '20');
    text.setAttribute('y', '105');
    text.setAttribute('font-family', 'Arial');
    text.setAttribute('font-size', '15px');
    text.setAttribute('fill', 'grey');
    svg.appendChild(text);
  }, []);


  useEffect(() => {
    const svg = leftSVGRef.current;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.textContent = '(main playlist) L-0';
    text.setAttribute('x', '25');
    text.setAttribute('y', '145');
    text.setAttribute('font-family', 'Arial');
    text.setAttribute('font-size', '15px');
    text.setAttribute('fill', 'grey');
    svg.appendChild(text);
  }, []);
  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    // Right part (zoomable)
    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2); // Translate to the center
    ctx.scale(scaleRef.current, 1); // Scale based on current zoom
  
    const lineWidth = 2 / scaleRef.current; // Adjust line width based on current scale
    const numLines = 500; // Number of vertical lines to draw
  
    const maxGap = 80; // Maximum gap in pixels between lines
    const minGap = 40; // Minimum gap in pixels between lines
  
    const scaledMaxGap = maxGap / scaleRef.current; // Adjust maximum gap according to zoom level
    const scaledMinGap = minGap / scaleRef.current; // Adjust minimum gap according to zoom level
  
    const lineGap = Math.max(scaledMinGap, Math.min(ctx.canvas.width * 0.1, scaledMaxGap));
  
    // Draw multiple vertical lines
    for (let i = -numLines / 2; i <= numLines / 2; i++) {
      const x = i * lineGap;
      ctx.beginPath();
      ctx.moveTo(x, -ctx.canvas.height / 2); // Move to top of canvas
      ctx.lineTo(x, ctx.canvas.height / 2); // Draw vertically to the bottom of canvas
      ctx.strokeStyle = 'black'; // Set line color
      ctx.lineWidth = lineWidth; // Set line width adjusted for scale
      ctx.stroke(); // Draw the line
    }
    ctx.restore();
  
    // Draw time markers
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
  
    const markerInterval = 50; // Interval between markers in pixels
    const timeInterval = 5; // Interval between each time marker in seconds
  
    // Calculate the total range of the timeline
    const totalRange = numLines * lineGap;
  
    // Calculate the number of markers based on the canvas width
    const numMarkers = Math.ceil(totalRange / markerInterval);
  
    // Draw markers from 0s to the maximum time based on the number of markers
    for (let i = 0; i <= numMarkers; i++) {
      const time = i * timeInterval;
      const x = (i - numMarkers / 2) * markerInterval; // Center markers around the center of the canvas
      ctx.fillText(`${time}s`, x + ctx.canvas.width / 2 + 2, ctx.canvas.height - 10);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior

    // Calculate new scale based on wheel delta
    const delta = e.deltaY > 0 ? -0.1 : 0.1; // Adjust the delta value based on direction
    scaleRef.current = Math.max(0.1, scaleRef.current + delta); // Adjust min scale as needed

    // Redraw canvas with new scale
    const rightCanvas = rightCanvasRef.current;
    const ctx = rightCtxRef.current;

    // Clear canvas before redraw
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Set new canvas size based on client size
    rightCanvas.width = rightCanvas.clientWidth;
    rightCanvas.height = rightCanvas.clientHeight;

    draw(ctx);
  };

  return (
    <div className="App" style={{ marginTop: '65px' }}>
      <svg
        ref={leftSVGRef}
        id="left-svg"
        className="left-svg"
        style={{ border: "1px solid black", width: "150px", height: "180px" }}
      />
      <canvas
        ref={rightCanvasRef}
        id="right-canvas"
        className="right-canvas"
        style={{ border: "1px solid black", width: "600px", height: "180px" }}
      />      
    </div>
  );
}

export default App;

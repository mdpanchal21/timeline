// import React, { useRef, useEffect } from 'react';
// import './App.css';

// function App() {
//   const canvasRef = useRef(null);
//   const ctxRef = useRef(null);
//   const scaleRef = useRef(1);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = canvas.clientWidth;
//     canvas.height = canvas.clientHeight;
//     const ctx = canvas.getContext('2d');
//     ctxRef.current = ctx;

//     // Initial drawing
//     draw(ctx);

//     // Event listeners
//     canvas.addEventListener('wheel', handleWheel);

//     return () => {
//       canvas.removeEventListener('wheel', handleWheel);
//     };
//   }, []);

//   const draw = (ctx) => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     ctx.fillStyle = 'lightgreen';
//     ctx.fillRect(10, 10, 50 * scaleRef.current, 50 * scaleRef.current); // Example rectangle

//     // Draw vertical line
//     ctx.beginPath();
//     ctx.strokeStyle = 'black'; // Color of the line
//     ctx.lineWidth = 3; // Width of the line
//     ctx.moveTo(100, 0); // Starting point (x, y)
//     ctx.lineTo(100, 300); // Ending point (x, y)
//     ctx.stroke(); // Draw the line
//   };

//   const handleWheel = (e) => {
//     const canvas = canvasRef.current;
//     const ctx = ctxRef.current;

//     // Calculate new scale based on wheel delta
//     const delta = e.deltaY > 0 ? -0.1 : 0.1; // Adjust the delta value based on direction
//     scaleRef.current = Math.max(0.1, scaleRef.current + delta); // Adjust min scale as needed

//     // Redraw canvas with new scale
//     canvas.width = canvas.clientWidth;
//     canvas.height = canvas.clientHeight;
//     draw(ctx);
//   };

//   return (
//     <div className="App">
//       <canvas
//         ref={canvasRef}
//         id="zoom"
//         className="zoom-canvas"
//         style={{ border: "1px solid black", width: "700px", height: "250px" }}
//       />
//     </div>
//   );
// }

// export default App;


// second one 

// import React, { useRef, useEffect } from 'react';
// import './App.css';
// import { Box, Flex } from '@chakra-ui/react';

// function App() {
//   const leftCanvasRef = useRef(null);
//   const rightCanvasRef = useRef(null);
//   const rightCtxRef = useRef(null);
//   const scaleRef = useRef(1);

//   useEffect(() => {
//     const rightCanvas = rightCanvasRef.current;

//     rightCanvas.width = rightCanvas.clientWidth;
//     rightCanvas.height = rightCanvas.clientHeight;
//     const rightCtx = rightCanvas.getContext('2d');
//     rightCtxRef.current = rightCtx;

//     // Initial drawing
//     draw(rightCtx);

//     // Event listener for right canvas only
//     rightCanvas.addEventListener('wheel', handleWheel);

//     return () => {
//       rightCanvas.removeEventListener('wheel', handleWheel);
//     };
//   }, []);

//   const draw = (ctx) => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//     // Right part (zoomable)
//     ctx.save();
//     ctx.translate(ctx.canvas.width / 2, ctx.canvas.height * 0.95); // Translate to the center
//     ctx.scale(scaleRef.current, 1); // Scale based on current zoom

//     // Draw outer line
//     const lineWidth = ctx.canvas.width * 0.02; // Line width based on canvas size
//     ctx.beginPath();
//     ctx.moveTo(-ctx.canvas.width / 2, 0); // Move to starting point
//     ctx.lineTo(ctx.canvas.width / 2, 0); // Draw a line
//     ctx.strokeStyle = 'blue'; // Set line color
//     ctx.lineWidth = lineWidth; // Set line width based on canvas size
//     ctx.stroke(); // Draw the line

//     // Draw nested line inside the outer line
//     ctx.save();
//     ctx.scale(0.6, 0.6); // Scale down for the nested line
//     ctx.beginPath();
//     ctx.moveTo(-ctx.canvas.width / 2, 0); // Move to starting point
//     ctx.lineTo(ctx.canvas.width / 2, 0); // Draw a line
//     ctx.strokeStyle = 'red'; // Set line color for nested line
//     ctx.lineWidth = lineWidth * 0.6; // Set line width based on canvas size and scale
//     ctx.stroke(); // Draw the line
//     ctx.restore();

//     ctx.restore();
//   };

//   const handleWheel = (e) => {
//     e.preventDefault(); // Prevent default scrolling behavior

//     // Calculate new scale based on wheel delta
//     const delta = e.deltaY > 0 ? -0.1 : 0.1; // Adjust the delta value based on direction
//     scaleRef.current = Math.max(0.1, scaleRef.current + delta); // Adjust min scale as needed

//     // Redraw canvas with new scale
//     const rightCanvas = rightCanvasRef.current;
//     const ctx = rightCtxRef.current;
//     rightCanvas.width = rightCanvas.clientWidth;
//     rightCanvas.height = rightCanvas.clientHeight;
//     draw(ctx);
//   };

//   return (
//     <div className="App" style={{marginTop:'65px'}}>
//       <canvas
//         ref={leftCanvasRef}
//         id="left-canvas"
//         className="first-canvas"
//         style={{ border: "1px solid black", width: "150px", height: "250px" }}
//       />
//       <canvas
//         ref={rightCanvasRef}
//         id="right-canvas"
//         className="second-canvas"
//         style={{ border: "1px solid black", width: "600px", height: "250px" }}
//       />
//     </div>
//   );
// }

// export default App;




// # show second in the timeline

// const draw = (ctx) => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
//     // Right part (zoomable)
//     ctx.save();
//     ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2); // Translate to the center
//     ctx.scale(scaleRef.current, 1); // Scale based on current zoom
  
//     const lineWidth = 2 / scaleRef.current; // Adjust line width based on current scale
//     const numLines = 500; // Number of vertical lines to draw
  
//     const maxGap = 80; // Maximum gap in pixels between lines
//     const minGap = 40; // Minimum gap in pixels between lines
  
//     const scaledMaxGap = maxGap / scaleRef.current; // Adjust maximum gap according to zoom level
//     const scaledMinGap = minGap / scaleRef.current; // Adjust minimum gap according to zoom level
  
//     const lineGap = Math.max(scaledMinGap, Math.min(ctx.canvas.width * 0.1, scaledMaxGap));
  
//     // Draw multiple vertical lines
//     for (let i = -numLines / 2; i <= numLines / 2; i++) {
//       const x = i * lineGap;
//       ctx.beginPath();
//       ctx.moveTo(x, -ctx.canvas.height / 2); // Move to top of canvas
//       ctx.lineTo(x, ctx.canvas.height / 2); // Draw vertically to the bottom of canvas
//       ctx.strokeStyle = 'black'; // Set line color
//       ctx.lineWidth = lineWidth; // Set line width adjusted for scale
//       ctx.stroke(); // Draw the line
//     }
//     ctx.restore();
  
//     // Draw time markers
//     ctx.fillStyle = 'black';
//     ctx.font = '12px Arial';
  
//     const markerInterval = 50; // Interval between markers in pixels
//     const timeInterval = 5; // Interval between each time marker in seconds
  
//     // Calculate the total range of the timeline
//     const totalRange = numLines * lineGap;
  
//     // Calculate the number of markers based on the canvas width
//     const numMarkers = Math.ceil(totalRange / markerInterval);
  
//     // Draw markers from 0s to the maximum time based on the number of markers
//     for (let i = 0; i <= numMarkers; i++) {
//       const time = i * timeInterval;
//       const x = (i - numMarkers / 2) * markerInterval; // Center markers around the center of the canvas
//       ctx.fillText(`${time}s`, x + ctx.canvas.width / 2 + 2, ctx.canvas.height - 10);
//     }
//   };
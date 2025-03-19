// // components/SlideManager.js
// import React, { useEffect, useState } from 'react';

// import { DragIndicator } from '@mui/icons-material';
// import { Box, Button, Paper, Typography } from '@mui/material';
// import Reveal from 'reveal.js';

// import SlideEditor from '../SlideEditor';

// const SlideManager = () => {
//   const [slides, setSlides] = useState([
//     { title: 'Slide 1', content: 'Content for slide 1' },
//   ]);

//   const addSlide = () => {
//     setSlides([
//       ...slides,
//       {
//         title: `Slide ${slides.length + 1}`,
//         content: `Content for slide ${slides.length + 1}`,
//       },
//     ]);
//   };

//   const onDragStart = (e, index) => {
//     e.dataTransfer.setData('text/plain', index);
//   };

//   const onDrop = (e, index) => {
//     const draggedIndex = e.dataTransfer.getData('text/plain');
//     const reorderedSlides = Array.from(slides);
//     const [movedSlide] = reorderedSlides.splice(draggedIndex, 1);
//     reorderedSlides.splice(index, 0, movedSlide);
//     setSlides(reorderedSlides);
//   };

//   const onDragOver = (e) => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     const deck = new Reveal();
//     deck.initialize();
//   }, []);

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={addSlide}>
//         Add Slide
//       </Button>
//       <Box sx={{ marginTop: 2 }}>
//         {slides.map((slide, index) => (
//           <Paper
//             key={index}
//             draggable
//             onDragStart={(e) => onDragStart(e, index)}
//             onDragOver={onDragOver}
//             onDrop={(e) => onDrop(e, index)}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               padding: 2,
//               margin: '8px 0',
//               cursor: 'move',
//             }}
//           >
//             <DragIndicator style={{ marginRight: '8px' }} />
//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               {slide.title}
//             </Typography>
//             <Typography variant="body2">{slide.content}</Typography>
//           </Paper>
//         ))}
//       </Box>
//       <Reveal />
//       {/* Reveal.js Slides */}
//       <div className="reveal">
//         <div className="slides">
//           {slides.map((slide, index) => (
//             <section key={index}>
//               <h2>{slide.title}</h2>
//               <SlideEditor />
//               <p>{slide.content}</p>
//             </section>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SlideManager;

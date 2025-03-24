import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/gallery/${category.toLowerCase()}`);
  };

  return (
    <div className="home-container">
      <div className="home-overlay"></div>{" "}
      {/* Background overlay for better readability */}
      <div className="home-content">
        <div className="container">
          {/* Artist Line Art */}
          <img
            src="./cabrereaLine.png"
            alt="Artist Line Art"
            className="artist-image"
          />

          {/* Title and Subtitle */}
          <div className="title-container">
            <h1 className="home-title">A Legacy in</h1>
            <h1 className="home-title">Color and Line</h1>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="home-buttons">
          {["Sketches", "Painting", "Sculpture"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="home-button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate();

//   const handleCategoryClick = (category) => {
//     navigate(`/gallery/${category}`);
//   };

//   return (
//     <div
//       className="home-container relative min-h-screen flex flex-col items-center justify-center text-white p-8"
//       style={{
//         fontFamily: "audrielle-no1, sans-serif",
//         backgroundImage: `url('./final-10.jpg')`,
//       }}
//     >
//       <div className="container">
//         {/* Artist Line Art */}
//         <img
//           src="./cabrereaLine.png"
//           alt="Artist Line Art"
//           className="artist-image"
//         />

//         {/* Title and Subtitle */}
//         <div className="title-container">
//           <h1 className="title">A Legacy in</h1>
//           <h1 className="title">Color and Line</h1>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => handleCategoryClick("Sketches")}
//           id="sketches"
//           className="button bg-gray-300 text-black px-6 py-4 text-lg rounded"
//         >
//           Sketches
//         </button>
//         <button
//           onClick={() => handleCategoryClick("Painting")}
//           id="painting"
//           className="button bg-gray-300 text-black px-6 py-4 text-lg rounded"
//         >
//           Painting
//         </button>
//         <button
//           onClick={() => handleCategoryClick("Sculpture")}
//           id="sculpture"
//           className="button bg-gray-300 text-black px-6 py-4 text-lg rounded"
//         >
//           Sculpture
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Home;

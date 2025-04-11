import React from "react";
import { useNavigate } from "react-router-dom";
import TouchCanvas from "./CursorEffect"; // Assuming you have a CursorEffect component

function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/gallery/${category.toLowerCase()}`);
  };

  const categories = [
    { name: "Painting", img: "/paintinggg.png" },
    { name: "Sculpture", img: "/sculptureee.png" },
    { name: "Sketches", img: "/sketchesss.png" },
  ];

  return (
    <div className="home-container">
      <TouchCanvas />
      <div className="home-overlay"></div>{" "}
      {/* Background overlay for better readability */}
      <div className="home-content">
        <div className="container">
          {/* Artist Line Art */}
          {/* <img
            src="./cabrereaLine.png"
            alt="Artist Line Art"
            className="artist-image"
          /> */}
          <video
            autoPlay
            loop
            muted
            className="artist-image"
            style={{ width: "100%", height: "auto" }}
          >
            {" "}
            <source
              src="/lineart.webm"
              type="video/webm"
            />
            <source
              src="/lineart.mov"
              type="video/quicktime"
            />
            Your browser does not support the video tag.
          </video>

          {/* Title and Subtitle */}
          <div className="title-container">
            <h1 className="home-title">A Legacy in</h1>
            <h1 className="home-title">Color and Line</h1>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category.name}
              className="category-button"
              onClick={() => handleCategoryClick(category.name)}
              aria-label={`View ${category.name} gallery`}
            >
              <img
                src={category.img}
                alt=""
                className="category-icon-home"
                onError={(e) => {
                  e.target.src = "/icons/default-category.png";
                  e.target.style.opacity = "0.7";
                }}
              />
              {/* <span className="category-name">{category.name}</span> */}
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

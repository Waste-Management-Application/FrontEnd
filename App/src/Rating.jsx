// Rating.js
import React from "react";

const Rating = ({ starsNo }) => {
  // Calculate the number of full stars and half stars (if any)
  const fullStars = Math.floor(starsNo);
  const hasHalfStar = starsNo % 1 !== 0;

  // Create an array to represent the stars (full, half, and empty)
  const starsArray = Array.from({ length: fullStars }, (_, index) => (
    <span key={index}>&#9733;</span> // Full star symbol (★)
  ));

  if (hasHalfStar) {
    starsArray.push(<span key="half-star">&#9733;&#189;</span>); // Half star symbol (★½)
  }

  // Fill remaining spaces with empty stars
  while (starsArray.length < 5) {
    starsArray.push(<span key={starsArray.length}>&#9734;</span>); // Empty star symbol (☆)
  }

  return <div>{starsArray}</div>;
};

export default Rating;

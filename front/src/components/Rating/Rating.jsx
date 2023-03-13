import React, { useState } from "react";

const Rating = ({ value }) => {
  const [rating, setRating] = useState(value);

  const handleClick = (newValue) => {
    setRating(newValue);
  };

  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          onClick={() => handleClick(i + 1)}
          style={{ color: i < rating ? "gold" : "gray" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;

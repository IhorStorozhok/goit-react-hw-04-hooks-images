import React from "react";

const apiKey = "24257858-20682938b9e789ea234c047ef";

async function findImages(querry, page) {
  const response = await fetch(
    `https://pixabay.com/api/?q=${querry}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const data = await response.json();

  return data.hits;
}

export default findImages;

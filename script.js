const breedSelect = document.getElementById('breed-select'); // Get the select menu
const gallery = document.getElementById('gallery'); // Get the gallery div

// Fetch the list of dog breeds and add them to the select menu
fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    const breeds = Object.keys(data.message); // Get breed names

    // Add each breed as an option in the select menu
    breeds.forEach(breed => {
      const option = document.createElement('option'); // Create option
      option.value = breed; // Set the value for the option
      option.textContent = breed; // Set the text for the option
      breedSelect.appendChild(option); // Add the option to the select menu
    });
  });

// Listen for changes in the select menu
breedSelect.addEventListener('change', () => {
  const selectedBreed = breedSelect.value; // Get selected breed

  // If no breed is selected, clear the gallery and return
  if (!selectedBreed) {
    gallery.innerHTML = '';
    return;
  }

  // Fetch 9 random images for the selected breed
  fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/9`)
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      gallery.innerHTML = ''; // Clear any previous images

      // Loop through each image URL and create an image element
      data.message.forEach(imageUrl => {
        const img = document.createElement('img'); // Create an image element
        img.src = imageUrl; // Set the image source
        img.alt = `A cute ${selectedBreed}`; // Set the alt text
        gallery.appendChild(img); // Add the image to the gallery
      });
    });
});

console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener("DOMContentLoaded", async function() {
  try {
    // Fetch dog images from the API
    const imageResponse = await fetch(imgUrl);
    const imageData = await imageResponse.json();
    // Fetch dog breeds from the API
    const breedResponse = await fetch(breedUrl);
    const breedData = await breedResponse.json(); // Note: Corrected from imageResponse to breedResponse
    // Get the image container and breed list elements from the DOM
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    // Display dog images
    imageData.message.forEach(imgUrl => {
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = "Random Dog Image";
      imageContainer.appendChild(img);
    });
    // Display all dog breeds initially
    displayBreeds(breedData.message);
    // Filter dog breeds based on selected letter
    const breedDropdown = document.getElementById("breed-dropdown");
    breedDropdown.addEventListener("change", function() {
      const selectedLetter = this.value.toLowerCase();
      const filteredBreeds = filterBreedsByLetter(breedData.message, selectedLetter);
      displayBreeds(filteredBreeds);
    });
    // Function to display dog breeds in the <ul>
    function displayBreeds(breeds) {
      breedList.innerHTML = ""; // Clear previous breeds
      Object.keys(breeds).forEach(breed => {
        const li = document.createElement("li");
        li.textContent = breed;
        li.addEventListener("click", function() {
            li.style.color = "blue"; // Change font color to blue on click
            
        });
        breedList.appendChild(li);
    });
}

//Function to filter breeds by starting letter
function filterBreedsByLetter(breeds, letter) {
    const filteredBreeds = {};
    Object.keys(breeds).forEach(breed => {
        if (breed.charAt(0).toLowerCase() === letter) {
            filteredBreeds[breed] = breeds[breed];
        }
    }); 
    return filteredBreeds;
}

} catch (error) {
    console.error("Error fetching data:", error);
}
})
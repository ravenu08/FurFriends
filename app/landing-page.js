let text = document.querySelector('.subTagline');
let word = "";
var sentence = "Explore the extensive library of dog and cat breeds.    ";
let i = 0
setInterval(function(){
    word = word + sentence[i];
    //console.log(word);
    text.innerText = word;
    i++;
   // console.log( sentence.length)
    if(i >= sentence.length ){
        i = 0;
        word = ""
    }
}
, 100);

const DOG_KEY = "live_oYm9vqROKCzupCnyiPXtXU90o3sLKhKmvqr0H2ewVGkdzFaQY9Tfd2NsShDX3Bow";
let currPAGE = 1;
const currLIMIT = 4;
const fetchDisplayDogs = async (breedName = "", currentPage = currPAGE) => {
    try {
        let url;
        if (breedName) {
            const breedResponse = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breedName}`, {
                headers: {
                    'x-api-key': DOG_KEY
                }
            });
            const breedData = await breedResponse.json();
            
            if (breedData.length === 0) {
                console.error(`No breed found with the name '${breedName}'`);
                return;
            }

            const breedId = breedData[0].id; 
            console.log("Breed ID:", breedId);

            url = `https://api.thedogapi.com/v1/images/search?limit=${currLIMIT}&page=${currentPage}&breed_ids=${breedId}&api_key=${DOG_KEY}`;
        } else {
            url = `https://api.thedogapi.com/v1/images/search?limit=${currLIMIT}&page=${currentPage}&api_key=${DOG_KEY}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        displayCarouselDogs(data);
        //console.log(data);
    } catch (error) {
        console.error('Error fetching dog data:', error);
    }
};

const searchCarouselDogs = () => {
    const breedName = document.getElementById('searchBreed').value.trim();
    console.log("Breed Name:", breedName);
    currPAGE = 1; 
    document.querySelector("#carouselIndicators").innerHTML = '';
    document.querySelector("#carouselInner").innerHTML = '';
    fetchDisplayDogs(breedName);
};

const displayCarouselDogs = (dogs) => {
    const indicators = document.querySelector("#carouselIndicators");
    const inner = document.querySelector("#carouselInner");

    dogs.forEach((dog, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const indicator = `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${activeClass}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
        const item = `<div class="carousel-item ${activeClass}">
                        <img src="${dog.url}" class="d-block w-100" alt="Dog Image" style="height: 300px; width: 96%;">
                    </div>`;
        indicators.innerHTML += indicator;
        inner.innerHTML += item;
    });
};

document.getElementById('searchDogBreed').addEventListener('click', searchCarouselDogs);
fetchDisplayDogs();

const CAT_KEY = "live_ACJqJsfkTSyrOfvIkbkhsEslUzjrMvoaCSmEAxIbVw4Mnv9rz0xfsTbMqcEiLKX2";
const fetchDisplayCats = async (breedName = "", currentPage = currPAGE) => {
    try {
        let url;
        if (breedName) {
            const breedResponse = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`, {
                headers: {
                    'x-api-key': CAT_KEY
                }
            });
            const breedData = await breedResponse.json();
            
            if (breedData.length === 0) {
                console.error(`No breed found with the name '${breedName}'`);
                return;
            }

            const breedId = breedData[0].id; 
            url = `https://api.thecatapi.com/v1/images/search?limit=${currLIMIT}&page=${currentPage}&breed_ids=${breedId}&api_key=${CAT_KEY}`;
        } else {
            url = `https://api.thecatapi.com/v1/images/search?limit=${currLIMIT}&page=${currentPage}&api_key=${CAT_KEY}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        displayCarouselCats(data);
    } catch (error) {
        console.error('Error fetching cat data:', error);
    }
};

const searchCarouselCats = () => {
    const breedName = document.getElementById('searchCatBreed').value.trim();
    currPAGE= 1; 
    document.querySelector("#carouselIndicators2").innerHTML = '';
    document.querySelector("#carouselInner2").innerHTML = '';
    fetchDisplayCats(breedName);
};

const displayCarouselCats = (cats) => {
    const indicators = document.querySelector("#carouselIndicators2");
    const inner = document.querySelector("#carouselInner2");

    cats.forEach((cat, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const indicator = `<button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="${index}" class="${activeClass}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
        const item = `<div class="carousel-item ${activeClass}">
                        <img src="${cat.url}" class="d-block w-100" alt="Cat Image" style="height: 300px; width: 96%;">
                    </div>`;
        indicators.innerHTML += indicator;
        inner.innerHTML += item;
    });
};

document.getElementById('searchBreedCat').addEventListener('click', searchCarouselCats);
fetchDisplayCats();
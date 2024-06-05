const API_KEY = "live_ACJqJsfkTSyrOfvIkbkhsEslUzjrMvoaCSmEAxIbVw4Mnv9rz0xfsTbMqcEiLKX2";
let page = 1;
const LIMIT = 50;

const fetchCats = async (breedName = "", currentPage = page) => {
    try {
        let url;
        if (breedName) {
            const breedResponse = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`, {
                headers: {
                    'x-api-key': API_KEY
                }
            });
            const breedData = await breedResponse.json();

            if (breedData.length === 0) {
                console.error(`No breed found with the name '${breedName}'`);
                return;
            }

            const breedId = breedData[0].id;
            console.log("Breed ID:", breedId);

            url = `https://api.thecatapi.com/v1/images/search?limit=${LIMIT}&page=${currentPage}&breed_ids=${breedId}&api_key=${API_KEY}`;
        } else {

            url = `https://api.thecatapi.com/v1/images/search?limit=${LIMIT}&page=${currentPage}&api_key=${API_KEY}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        displayCats(data);
        //console.log(data);
    } catch (error) {
        console.error('Error fetching cat data:', error);
    }
};


const searchCats = () => {
    const breedName = document.getElementById('searchBreed').value.trim();
    console.log("Breed Name:", breedName);
    page = 1;
    document.querySelector(".listOfCats").innerHTML = '';
    fetchCats(breedName);
    document.getElementById('loadMore').hidden = true;
};

const displayCats = (cats) => {
    let additionalImg = "";
    cats.forEach(cat => {
        const breedInfo = cat.breeds.length > 0 ? cat.breeds[0] : null;
        if (breedInfo) {
            additionalImg += `
            <div class="card my-4 mx-2 mainCard" style="width: 18rem; height: 25rem">
                <img height="184px" src="${cat.url}" class="card-img-top mt-2" alt="Error" />
                <div class="card-body">
                <h5 class="card-title">${breedInfo.name}</h5>
                <p class="card-text" style="margin-bottom:5px;">Origin: ${breedInfo.origin}</p>
                <p class="card-text" style="margin-bottom:15px;">Temperament: ${breedInfo.temperament.slice(0, 25)}...</p>
                <a class="wikiButton" href="${breedInfo.wikipedia_url}"" target="_blank">
                    <span class="button__icon-wrapper">
                    <svg width="10" class="button__icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 15">
                        <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
                    </svg>
                    <svg class="button__icon-svg  button__icon-svg--copy" xmlns="http://www.w3.org/2000/svg" width="10" fill="none" viewBox="0 0 14 15">
                        <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
                    </svg>
                    </span>
                    <span class="buttonText btn">Read More</span>
                </a>
                </div>
            </div>`;
        }
    });
    document.querySelector(".listOfCats").insertAdjacentHTML('beforeend', additionalImg);
    VanillaTilt.init(document.querySelectorAll(".card"), {
        max: 5,
        speed: 400,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        perspective: 500,
        transition: true
    });
};

document.getElementById('loadMore').addEventListener('click', () => {
    page++;
    fetchCats();
});

document.getElementById('searchButton').addEventListener('click', searchCats);
fetchCats();

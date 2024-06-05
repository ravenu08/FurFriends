
function showLoader() {
    gsap.fromTo(
        ".loading-page",
        { opacity: 1 },
        {
            opacity: 0,
            display: "none",
            duration: 1.5,
            delay: 3.5,
        });
    gsap.fromTo(
        ".logo-name",
        {
            y: 50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 2,
            delay: 0.5,
        });
    gsap.fromTo(
        ".imgLogo",
        {
            y: 50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 2,
            delay: 0.5,
        });
}
showLoader();

const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
};

const theme = localStorage.getItem('theme') || (tmp = Object.keys(themeMap)[0],
    localStorage.setItem('theme', tmp),
    tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];

    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
}

document.getElementById('themeButton').onclick = toggleTheme;

const homePage = document.getElementById("landingPage")
const homePageBtn = document.getElementById("home")


const catLibrarySection = document.getElementById("catLibrary")
const catLibraryBtn = document.getElementById("catLibraryBtn")

const dogLibrarySection = document.getElementById("dogLibrary")
const dogLibraryBtn = document.getElementById("dogLibraryBtn")

const chatSection = document.getElementById("chatPage")
const chatBtn = document.getElementById("chatBtn")

const community = document.getElementById("community")
const communityBtn = document.getElementById("communityBtn")

const aboutUs = document.getElementById("aboutUsBtn")
const contact = document.getElementById("contact")

const libraryDog = document.getElementById("libraryDog")
const libraryCat = document.getElementById("libraryCat")
const joinGroup = document.querySelector("#next")


homePageBtn.addEventListener("click", () => {
    homePage.style.display = "block";
    catLibrarySection.style.display = "none";
    dogLibrarySection.style.display = "none";
    community.style.display = "none";

})

contact.addEventListener("click", () => {
    homePage.style.display = "block";
    catLibrarySection.style.display = "none";
    dogLibrarySection.style.display = "none";
    community.style.display = "none";

})

aboutUs.addEventListener("click", () => {
    homePage.style.display = "block";
    catLibrarySection.style.display = "none";
    dogLibrarySection.style.display = "none";
    community.style.display = "none";

})

catLibraryBtn.addEventListener("click", () => {
    catLibrarySection.style.display = "block";
    dogLibrarySection.style.display = "none";
    community.style.display = "none";
    homePage.style.display = "none";

})
libraryCat.addEventListener("click", () => {
    catLibrarySection.style.display = "block";
    dogLibrarySection.style.display = "none";
    community.style.display = "none";
    homePage.style.display = "none";

})

dogLibraryBtn.addEventListener("click", () => {
    dogLibrarySection.style.display = "block";
    catLibrarySection.style.display = "none";
    community.style.display = "none";
    homePage.style.display = "none";

})
libraryDog.addEventListener("click", () => {
    dogLibrarySection.style.display = "block";
    catLibrarySection.style.display = "none";
    community.style.display = "none";
    homePage.style.display = "none";

})

communityBtn.addEventListener("click", () => {
    catLibrarySection.style.display = "none";
    dogLibrarySection.style.display = "none";
    community.style.display = "block";
    homePage.style.display = "none";

})
joinGroup.addEventListener("click", () => {
    catLibrarySection.style.display = "none";
    dogLibrarySection.style.display = "none";
    community.style.display = "block";
    homePage.style.display = "none";

})



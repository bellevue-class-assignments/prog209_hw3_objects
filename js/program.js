// initialize startup data
const firstYear = 1833;
const lastYear = new Date().getFullYear();

let movieLibrary = [],
    movieRatings = [{
            ratingValue: 5,
            ratingText: "5 - Excellent"
        },
        {
            ratingValue: 4,
            ratingText: "4 - Very Good"
        },
        {
            ratingValue: 3,
            ratingText: "3 - Good"
        },
        {
            ratingValue: 2,
            ratingText: "2 - Fair"
        },
        {
            ratingValue: 1,
            ratingText: "1 - Poor"
        }
    ],
    movieTitle = document.querySelector("#movieTitle"),
    movieYear = document.querySelector("#movieYear"),
    movieRating = document.querySelector("#movieRating"),
    movieSubmit = document.querySelector("#movieSubmit"),
    movieLibraryTable = document.querySelector("#movieLibrary"),
    libraryButton = document.querySelector("#libraryButton"),
    displayLibraryButton = document.querySelector("#displayLibrary"),
    currentIndex = 0;

movieSubmit.addEventListener("click", submitMovie, false);
displayLibraryButton.addEventListener("click", displayLibrary, false);


loadRatings();
loadYears();
// only uncomment during testing
// loadTestData();

// load test data
function loadTestData() {
    movieLibrary.push({ "title": "test 1", "rating": 3, "year": 1999 });
    movieLibrary.push({ "title": "test 2", "rating": 5, "year": 2005 });
}


// load valid years into year dropdown
function loadYears() {
    createOption(0, "select production year", movieYear);
    for (let i = lastYear; i >= firstYear; i--) {
        createOption(i, i, movieYear);
    }
}

// load the reatings into the ratings dropdown
function loadRatings() {
    createOption(0, "select rating", movieRating);
    for (let i = 0; i < movieRatings.length; i++) {
        createOption(movieRatings[i].ratingValue, movieRatings[i].ratingText, movieRating);
    }
}

// create option elements for dropdown lists
function createOption(optionValue, optionTextValue, selectObject) {
    let newOption = document.createElement("OPTION");
    newOption.setAttribute("value", optionValue);
    let optionText = document.createTextNode(optionTextValue);
    newOption.appendChild(optionText);
    selectObject.appendChild(newOption);
}

// add new movie to library
function submitMovie() {
    if (validateInput()) {
        movieLibrary.push({ "title": movieTitle.value, "rating": movieRating.value, "year": movieYear.value });
        displayLibraryButton.style.visibility = "visible";
        libraryButton.style.visibility = "visible";
    } else {
        alert("The data provided was invalid. The movie was not saved.");
    }
    loadLibrary();
}

// validate that all fields have been set appropriately
function validateInput() {
    if (movieTitle.value.length > 0 &&
        movieYear.value != 0 &&
        movieRating.value != 0) {
        return true;
    }
}

function displayLibrary() {
    let libraryDiv = document.querySelector("#library");
    libraryDiv.style.visibility = "visible";
}

// load library contents
function loadLibrary() {
    let movieCount = movieLibrary.length

    // remove all child nodes from the library table
    while (movieLibraryTable.firstChild) {
        movieLibraryTable.removeChild(movieLibraryTable.firstChild);
    }

    // create header row for library table
    createDiv("libraryHeader", "tableRow", null, movieLibraryTable);
    let libraryHeader = document.querySelector("#libraryHeader");
    createDiv(null, "tableValue libraryTitle", "Title", libraryHeader);
    createDiv(null, "tableValue movieRating", "Rating", libraryHeader);
    createDiv(null, "tableValue movieYear", "Year", libraryHeader);

    // if movieLibrary is empty, add note that there are no movies
    if (movieLibrary.length == 0) {
        createDiv(null, "tableValue emptyLibrary", "library is empty", movieLibraryTable);
        createDiv(null, "tableValue emptyLibrary", "", movieLibraryTable);
        createDiv(null, "tableValue emptyLibrary", "", movieLibraryTable);
    }

    // else add all the movies in the library
    else {
        // for (i = currentIndex; i < 10; i++) {
        let star = "\u2B50"
        for (i = 0; i < movieLibrary.length; i++) {
            let movieDivId = "Movie" + i;
            createDiv(movieDivId, "tableRow", null, movieLibraryTable);
            let movieDiv = document.querySelector("#" + movieDivId);
            createDiv(null, "tableValue libraryData", movieLibrary[i].title, movieDiv);
            createDiv(null, "tableValue libraryData", star.repeat(movieLibrary[i].rating), movieDiv);
            createDiv(null, "tableValue libraryData", movieLibrary[i].year, movieDiv);
        }
        // if (movieLibrary.length > 10) {
        //     prevIndex = currentIndex - 10;
        //     nextIndex = currentIndex + 10;
        // }
    }

    // add footer with count of movies
    createDiv("libraryFooter", "tableRow", null, movieLibraryTable);
    let libraryFooter = document.querySelector("#libraryFooter");
    createDiv(null, "tableValue footerTitle", "Movie Count:", libraryFooter);
    createDiv(null, "tableValue", "", libraryFooter);
    createDiv(null, "tableValue footerCount", movieCount, libraryFooter);

    // if (movieCount > 10) {
    //     createDiv("libraryPager", "tableRow", null, movieLibraryTable);
    //     let libraryPager = document.querySelector("#libraryPager");
    //     createDiv(null, "tableValue", "", libraryPager);
    //     createDiv(null, "tableValue", "", libraryPager);
    //     createDiv("pagerButtons", "tableValue", "", libraryPager);
    //     let pagerButtons = document.querySelector("#pagerButtons");
    //     createButton("buttonPrev", "pagingButtons", "javascript:void(0)", "<", null, pagerButtons);
    //     createButton("buttonNext", "pagingButtons", "javascript:void(0)", ">", null, pagerButtons);
    // }
}

// create div elements as needed
function createDiv(divId, divClass, divValue, parent) {
    let newDiv = document.createElement("div");
    if (divId != null) { newDiv.id = divId; }
    if (divClass != null) { newDiv.className = divClass; }
    if (divValue != null) { newDiv.innerHTML = divValue; }
    parent.appendChild(newDiv);
}

function createButton(buttonID, buttonClass, buttonHref, buttonText, eventListener, buttonParent) {
    let newButton = document.createElement("a");
    newButton.href = buttonHref;
    newButton.id = buttonID;
    let newButtonText = document.createElement("span");
    newButtonText.innerText = buttonText;
    newButtonText.className = buttonClass;
    newButton.appendChild(newButtonText);
    buttonParent.appendChild(newButton);
    // newButton.addEventListener("click", () => )
}
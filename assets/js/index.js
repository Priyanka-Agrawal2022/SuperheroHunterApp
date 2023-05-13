const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-btn');
const resultContainer = document.getElementById('result-container');
const footer = document.getElementsByTagName('footer');
const marvelAPI = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=024dabc917ae9e01df3a604483201356&hash=e52caaa2c18b4119aac2f302e89b5a51`;

// var MD5 = require('crypto-js/md5');
// console.log(MD5("text to hash").toString());

// fetch data from Marvel API
function fetchMarvelAPI(url) {
    try {
        fetch(url)
            .then((response) => response.json())
            .then((data) => fetchAllSuperheroes(data));
    } catch (err) {
        console.log('Error: ', err);
    }
}

fetchMarvelAPI(marvelAPI);

// load all superheroes from Marvel API
function fetchAllSuperheroes(data) {
    let results = data.data.results;

    if (results.length != 0) {
        resultContainer.innerHTML = '';

        for (r of results) {
            let superheroCard = document.createElement('div');
            superheroCard.setAttribute('class', 'superhero-card');
            superheroCard.innerHTML = `
                <a href="./superhero.html?id=${r.id}" target="_blank">
                    <div class="superhero-photo">
                        <img src="${r.thumbnail.path}.${r.thumbnail.extension}" alt="Superhero Image" />
                    </div>
                </a>

                <div class="bottom">
                    <div class="superhero-name">${r.name}</div>
                    <div id="${r.id}" class="fav-icon" onclick="addToFavorites(${r.id}, '${r.name}', '${r.thumbnail.path}', '${r.thumbnail.extension}')">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>
            `;

            resultContainer.appendChild(superheroCard);

            footer[0].innerHTML = data.attributionHTML;

        }
    }
    else {
        resultContainer.innerHTML = '<h1>No results found! Please try other keywords...</h1>';
    }

    // mark the favorite
    for(id in localStorage) {
        let favIcon = document.getElementById(`${id}`);
        if(favIcon) {
            let icon = favIcon.getElementsByTagName('i');
            icon[0].classList.add('liked');
        }
    }
}

// show search results when search button is clicked
function showResults() {
    let searchTerm = searchBar.value;
    let oldSearchTerm = "";
    // run only if search bar's value changes
    // this will reduce the overhead caused by multiple calls to fetch same information on page 

    if(oldSearchTerm != searchTerm) {
        if(searchTerm) {
            fetchMarvelAPI(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&ts=1&apikey=024dabc917ae9e01df3a604483201356&hash=e52caaa2c18b4119aac2f302e89b5a51`);
            oldSearchTerm = searchTerm;
        }
        else {
            alert('Please enter valid keywords!');
        }
    }
}

// add superhero to Favorites tab when fav-icon is clicked
function addToFavorites(id, name, path, extension) {
    let favIcon = document.getElementById(id);
    let icon = favIcon.getElementsByTagName('i');

    if(!localStorage.getItem(id)) {
        let obj = {
            "id": id,
            "name": name,
            "thumbPath": path,
            "thumbExtension": extension
        };

        localStorage.setItem(id, JSON.stringify(obj));
        icon[0].classList.add('liked');
    }
    else {
        localStorage.removeItem(id);
        icon[0].classList.remove('liked');
    }
}
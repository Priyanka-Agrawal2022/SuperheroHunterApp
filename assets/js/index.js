const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-btn');
const resultContainer = document.getElementById('result-container');
const superheroAPI = `https://www.superheroapi.com/api.php/${ACCESS_TOKEN}/search/a`;

// fetch data from Superhero API
function fetchSuperheroAPI(url) {
    try {
        fetch(url)
            .then((response) => response.json())
            .then((data) => fetchAllSuperheroes(data));
    } catch (err) {
        console.log('Error: ', err);
    }
}

fetchSuperheroAPI(superheroAPI);

// load all superheroes from Superhero API
function fetchAllSuperheroes(data) {
    let results = data.results;

    if (results && results.length != 0) {
        resultContainer.innerHTML = '';

        for (r of results) {
            let superheroCard = document.createElement('div');
            superheroCard.setAttribute('class', 'superhero-card');
            superheroCard.innerHTML = `
                <a href="./superhero.html" onclick="sessionStorage.setItem('characterID', '${r.id}')">
                    <div class="superhero-photo">
                        <img src="${r.image.url}" alt="Superhero Image" />
                    </div>
                </a>

                <div class="bottom">
                    <div class="superhero-name">${r.name}</div>
                    <div id="${r.id}" class="fav-icon" onclick="addToFavorites(${r.id}, '${r.name}', '${r.image.url}')">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>
            `;

            resultContainer.appendChild(superheroCard);
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
            fetchSuperheroAPI(`https://www.superheroapi.com/api.php/${ACCESS_TOKEN}/search/${searchTerm}`);
            oldSearchTerm = searchTerm;
        }
        else {
            alert('Please enter valid keywords!');
        }
    }
}

// add superhero to Favorites tab when fav-icon is clicked
function addToFavorites(id, name, imageUrl) {
    let favIcon = document.getElementById(id);
    let icon = favIcon.getElementsByTagName('i');

    if(!localStorage.getItem(id)) {
        let obj = {
            "id": id,
            "name": name,
            "imageUrl": imageUrl
        };

        localStorage.setItem(id, JSON.stringify(obj));
        icon[0].classList.add('liked');
    }
    else {
        localStorage.removeItem(id);
        icon[0].classList.remove('liked');
    }
}
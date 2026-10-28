const favoritesContainer = document.getElementById('favorites-container');

// render the localStorage data
// no API call is made to reduce overhead
function fetchFavorites() {
    let data = localStorage;

    if(data.length != 0) {
        favoritesContainer.innerHTML = "";

        for(d in data) {
            if(d == 'length') {
                break;
            }

            let r;
            try {
                r = JSON.parse(localStorage.getItem(d));
            } catch(e) {
                continue;
            }
            if (!r || !r.id) continue;

            let superheroCard = document.createElement('div');
            superheroCard.setAttribute('class', 'superhero-card');
            superheroCard.setAttribute('id', '${r.id}');
            superheroCard.innerHTML = `
                <a href="./superhero.html" onclick="sessionStorage.setItem('characterID', '${r.id}')">
                    <div class="superhero-photo">
                        <img src="${r.imageUrl}" alt="Superhero Image" />
                    </div>
                </a>

                <div class="bottom">
                    <div class="superhero-name">${r.name}</div>
                    <div id="${r.id}" class="fav-icon" onclick="removeFromFavorites(${r.id})">
                        <i class="fa-solid fa-heart liked"></i>
                    </div>
                </div>
            `;

            favoritesContainer.appendChild(superheroCard);
        }
    }
    else {
        favoritesContainer.innerHTML = '<h1>No favourites added yet!</h1>';
    }
}

fetchFavorites();

// remove superhero from Favorites tab when fav-icon is clicked again
function removeFromFavorites(id) {
    let superheroCard = document.getElementById(id);
    superheroCard.remove();

    // remove obj from localStorage
    localStorage.removeItem(id);

    // refresh the page
    location.reload();

    if(localStorage.length == 0) {
        favoritesContainer.innerHTML = '<h1>No favourites added!</h1>';
    }
}
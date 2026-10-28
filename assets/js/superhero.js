const superheroPhoto = document.querySelectorAll('.superhero-photo')[0];
const superheroInfo = document.querySelectorAll('.superhero-info')[0];
// extract characterID from query params
const characterID = sessionStorage.getItem('characterID');

const superheroAPI = `https://www.superheroapi.com/api.php/${ACCESS_TOKEN}/${characterID}`;

// fetch data from Superhero API
function fetchSuperheroAPI(url) {
    try {
        fetch(url)
            .then((response) => response.json())
            .then((data) => fetchSuperhero(data));
    } catch (err) {
        console.log('Error: ', err);
    }
}

fetchSuperheroAPI(superheroAPI);

// load superhero from Superhero API
function fetchSuperhero(r) {
    if (r.response === 'error') {
        superheroInfo.innerHTML = `<h3>Superhero not found.</h3>`;
        return;
    }

    superheroPhoto.innerHTML = "";
    superheroInfo.innerHTML = "";

    superheroPhoto.innerHTML = `
        <img src="${r.image.url}" alt="Superhero Image" />
    `;

    superheroInfo.innerHTML = `
        <h3 class="name">${r.name}</h3>
        <p class="bio">${r.biography['full-name'] ? `Full name: ${r.biography['full-name']}` : ''}</p>
    `;

    // create powerstats list
    let powerstatsList = `
        <div class="comics">
            <h3>Power Stats</h3>
            <ul>
                <li>Intelligence: ${r.powerstats.intelligence}</li>
                <li>Strength: ${r.powerstats.strength}</li>
                <li>Speed: ${r.powerstats.speed}</li>
                <li>Durability: ${r.powerstats.durability}</li>
                <li>Power: ${r.powerstats.power}</li>
                <li>Combat: ${r.powerstats.combat}</li>
            </ul>
        </div>
    `;

    // create biography list
    let biographyList = `
        <div class="events">
            <h3>Biography</h3>
            <ul>
                <li>Publisher: ${r.biography.publisher}</li>
                <li>Alignment: ${r.biography.alignment}</li>
                <li>First Appearance: ${r.biography['first-appearance']}</li>
                <li>Alter Egos: ${r.biography['alter-egos']}</li>
            </ul>
        </div>
    `;

    // create connections list
    let connectionsList = `
        <div class="series">
            <h3>Connections</h3>
            <ul>
                <li>Group Affiliations: ${r.connections['group-affiliation']}</li>
                <li>Relatives: ${r.connections.relatives}</li>
            </ul>
        </div>
    `;

    // create appearance list
    let appearanceList = `
        <div class="stories">
            <h3>Appearance</h3>
            <ul>
                <li>Gender: ${r.appearance.gender}</li>
                <li>Race: ${r.appearance.race}</li>
                <li>Height: ${r.appearance.height.join(' / ')}</li>
                <li>Weight: ${r.appearance.weight.join(' / ')}</li>
                <li>Eye Color: ${r.appearance['eye-color']}</li>
                <li>Hair Color: ${r.appearance['hair-color']}</li>
            </ul>
        </div>
    `;

    superheroInfo.innerHTML += `${powerstatsList}${biographyList}${connectionsList}${appearanceList}`;

}
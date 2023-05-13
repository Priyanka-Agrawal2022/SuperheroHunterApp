const superheroPhoto = document.querySelectorAll('.superhero-photo')[0];
const superheroInfo = document.querySelectorAll('.superhero-info')[0];
const footer = document.getElementsByTagName('footer');

// extract characterID from query params
const urlParams = new URLSearchParams(window.location.search);
const characterID = urlParams.get('id');

const marvelAPI = `https://gateway.marvel.com/v1/public/characters/${characterID}?ts=1&apikey=024dabc917ae9e01df3a604483201356&hash=e52caaa2c18b4119aac2f302e89b5a51`;

// fetch data from Marvel API
function fetchMarvelAPI(url) {
    try {
        fetch(url)
            .then((response) => response.json())
            .then((data) => fetchSuperhero(data));
    } catch (err) {
        console.log('Error: ', err);
    }
}

fetchMarvelAPI(marvelAPI);

// load superhero from Marvel API
function fetchSuperhero(data) {
    let r = data.data.results[0];

    superheroPhoto.innerHTML = "";
    superheroInfo.innerHTML = "";

    superheroPhoto.innerHTML = `
        <img src="${r.thumbnail.path}.${r.thumbnail.extension}" alt="Superhero Image" />
    `;

    superheroInfo.innerHTML = `
        <h3 class="name">${r.name}</h3>
        <p class="bio">${r.description}</p>
    `;
    
    // create comics list
    let comics = r.comics.items;
    let comicsList = `
        <div class="comics">
            <h3>Comics</h3>
            <ul>
    `;

    for(c of comics) {
        let li = `<li>${c.name}</li>`;
        comicsList += li;
    }

    comicsList += `</ul></div>`;

    // create events list
    let events = r.events.items;
    let eventsList = `
        <div class="events">
            <h3>Events</h3>
            <ul>
    `;

    for(e of events) {
        let li = `<li>${e.name}</li>`;
        eventsList += li;
    }

    eventsList += `</ul></div>`;

    // create series list
    let series = r.series.items;
    let seriesList = `
        <div class="series">
            <h3>Series</h3>
            <ul>
    `;

    for(s of series) {
        let li = `<li>${s.name}</li>`;
        seriesList += li;
    }

    seriesList += `</ul></div>`;

    // create stories list
    let stories = r.stories.items;
    let storiesList = `
        <div class="stories">
            <h3>Stories</h3>
            <ul>
    `;

    for(st of stories) {
        let li = `<li>${st.name}</li>`;
        storiesList += li;
    }

    storiesList += `</ul></div>`;

    superheroInfo.innerHTML += `${comicsList}${eventsList}${seriesList}${storiesList}`;

    footer[0].innerHTML = data.attributionHTML;
}
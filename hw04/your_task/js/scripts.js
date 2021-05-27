const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const playTrack = (ev) => {
  //  console.log(ev.currentTarget);
    const elem = ev.currentTarget;
   // preview url (the mp3) has ben stashed in the "data-preview-track" attribute.
   // we need to get that attribute out 
    const previewURL = elem.dataset.previewTrack;
    console.log(previewURL);
    if (previewURL) {
        audioPlayer.setAudioFile(previewURL);
        audioPlayer.play();
    } else {
        console.log('There is no preview available for this track.')
    }
    document.querySelector('footer .track-item').innerHTML = elem.innerHTML;
};

const getTracks = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}&limit=5`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#tracks').innerHTML = '';
            for (const track of data) {
                let template = '';
                if (!track.preview_url) {
                     template = `
                     <section class="track-item preview" data-preview-track="${track.preview_url}">
                        <img src="${track.album.image_url}">
                        <div class="label">
                             <h3>${track.name}</h3>
                            <p>
                                ${track.artist.name} (No preview available)
                            </p>
                        </div>
                     </section> `
                } else {
                    template = `
                     <section class="track-item preview" data-preview-track="${track.preview_url}">
                        <img src="${track.album.image_url}">
                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                        <div class="label">
                             <h3>${track.name}</h3>
                            <p>
                                ${track.artist.name}
                            </p>
                        </div>
                     </section> `;
                }
                document.querySelector('#tracks').innerHTML += template;
                console.log(track);
            }

            for (const elem of document.querySelectorAll('.track-item.preview')) {
                elem.onclick = playTrack;
            }
        })
};

const getAlbums = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=album&q=${term}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#albums').innerHTML = '';
            for (const album of data) {
                let template = '';
                if (!album.image_url) {
                     template = `
                <section class="album-card" id="${album.id}">
                    <div>
                        <img src="${album.image_url}"> 
                        <h3>${album.name} No albums were returned </h3>
                        <div class="footer">
                            <a href="${album.spotify_url}" target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`
            } else {
                 template = `
                <section class="album-card" id="${album.id}">
                    <div>
                        <img src="${album.image_url}"> 
                        <h3>${album.name}</h3>
                        <div class="footer">
                            <a href="${album.spotify_url}" target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`;
            }
                document.querySelector('#albums').innerHTML += template;
                console.log(album);
            }
        })
};


const getArtist = (term) => {
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);

    let url = baseURL + `?type=artist&q=${term}&limit=1`;
    console.log(url);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(artist => {
            console.log(artist)
            document.querySelector('#artist').innerHTML = 
                `<section class="artist-card" id="${artist[0].id}">
                    <div>
                        <img src="${artist[0].image_url}">
                        <h3>"${artist[0].name}"</h3>
                        <div class="footer">
                            <a href="${artist[0].spotify_url}" target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`
        })
    };


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};

// how do I add an error message when there are no artists returned or when no tracks or albums are returned 
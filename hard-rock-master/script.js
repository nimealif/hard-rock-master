const searchSong = async()=>{
const searchtext = document.getElementById("search-field").value;
    
const url =`https://api.lyrics.ovh/suggest/${searchtext}`
   const res = await fetch(url);
     const data = await res.json();
    displaySongs(data.data);
}

const displaySongs = songs =>{
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML=""
    songs.forEach(song => {
        
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songContainer.appendChild(songDiv) 
        songDiv.innerHTML = `
        <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by ${song.artist.name}</p>
                           <audio controls>
                            <source src="${song.preview}" type="audio/ogg">
                            </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>`
    });
}

const  getLyric = async (artist, title) =>{
     const url = ` https://api.lyrics.ovh/v1/:${artist}/:${title}`
     const res = await fetch(url);
     const data = await res.json();
     songLyrics(data.lyrics);
}

const songLyrics = lyrics =>{
   const lyricsDisplay = document.getElementById("song-lyrics")
   lyricsDisplay.innerText = lyrics;
}
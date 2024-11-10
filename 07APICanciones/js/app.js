const cargarDatos = async () => {
    let artista = document.querySelector("#artista").value;
    let cancion = document.querySelector("#cancion").value;

    if (artista.trim() === '' || cancion.trim() === '') {
        mostrarError("#msj-error", "FALTA LLENAR CAMPOS");
        return;
    }

    const urlLetra = `https://api.lyrics.ovh/v1/${encodeURIComponent(artista)}/${encodeURIComponent(cancion)}`;
    const urlArtista = `https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${artista}`;


    const rLetra = await fetch(urlLetra);
    const resLetra = await rLetra.json();

    if (resLetra.error === "No lyrics found") {
        divCancion.innerHTML = `<p class="alert alert-primary">ERROR: NO HAY RESULTADOS</p>`;
        setTimeout(() => { divCancion.innerHTML = ``; }, 2000);
        return;
    }

    const rArtista = await fetch(urlArtista);
    const resArtista = await rArtista.json();

    if (resArtista.artists === null) {
        divArtista.innerHTML = `<p class="alert alert-primary">ERROR: NO HAY RESULTADOS</p>`;
        setTimeout(() => { divArtista.innerHTML = ``; }, 2000);
        return;
    }

    let divArtista = document.querySelector("#divArtista");
    let divCancion = document.querySelector("#divCancion");

    divArtista.innerHTML = '<img src="../img/sp.gif" style="text-align:center" width=250 height=250>';

    let infoArtista = resArtista.artists[0];
    let letraCancion = resLetra.lyrics;

    console.log(resLetra);

    setTimeout(() => {
        const { strArtistAlternate, strArtistThumb, strGenre, strBiographyEN, strBiographyES, strFacebook, strTwitter, strLastFMChart } = infoArtista;

        let bio = (strBiographyES === null) ? strBiographyEN : strBiographyES;
        let face = (infoArtista.strFacebook === '') ? `` : `<a href="https://${strFacebook}" target="_blank"><i class="fab fa-facebook"></i></a>`;
        let twit = (infoArtista.strTwitter === '') ? `` : `<a href="https://${strTwitter}" target="_blank"><i class="fab fa-twitter"></i></a>`;
        let last = (infoArtista.strLastFMChart === null) ? `` : `<a href="${strLastFMChart}" target="_blank"><i class="fab fa-lastfm"></i></a>`;
        let redesSociales = face + twit + last;

        divArtista.innerHTML = `
        <div class="card border-light">
            <div class="card-header bg-info text-light font-weight-bold"><b>INFORMACIÓN DEL ARTISTA</b></div>
            <div class="card-body">
                <img src="${strArtistThumb}" alt="${strArtistAlternate}" style="height:240px;"/>
                <h2 class="card-text">${strArtistAlternate}</h2>
                <p class="card-text">Género: ${strGenre}</p>
                <h2 class="card-text">Biografía:</h2>
                <p class="card-text">${bio}</p>
                ${redesSociales}
            </div>
        </div>
        </div>
        `;

        divCancion.innerHTML = `
        <div class="card border-light">
            <div class="card-header bg-info text-light font-weight-bold"><b>LETRA DE LA CANCIÓN</b></div>
            <div class="card-body">
                <p class="letra">${letraCancion}</p>
            </div>
        </div>
        `;
    }, 2000);
};

const mostrarError = (elemento, mensaje) => {
    let divError = document.querySelector(elemento);
    divError.innerHTML = `<p class="alert alert-primary">${mensaje}</p>`;
    setTimeout(() => { divError.innerHTML = ""; }, 2000);
};

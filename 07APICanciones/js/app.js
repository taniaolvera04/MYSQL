const cargarDatos = async () => {
    let artista = document.querySelector("#artista").value;
    let cancion = document.querySelector("#cancion").value;
    

    if (artista.trim() === '' || cancion.trim() === '') {
        mostrarError("#msj-error", "FALTA LLENAR CAMPOS");
        return;
    }
    const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artista)}/${encodeURIComponent(cancion)}`;
  
    const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
  

    let divArtista = document.querySelector("#divArtista");
    let divCancion = document.querySelector("#divCancion");

    divArtista.innerHTML = '<img src="load.gif" style="text-align:center" width=300 height=300>';

    try {
        const rLetra = await fetch(url);
        if (!rLetra.ok) throw new Error(`Error al cargar letra: ${rLetra.status}`);
        const resLetra = await rLetra.json();
        let letraCancion = resLetra.lyrics;

        try {
            const rArtista = await fetch(url2);
            if (!rArtista.ok) throw new Error(`Error al cargar datos del artista: ${rArtista.status}`);
            const resArtista = await rArtista.json();

            if (resArtista.artists) {
                let infoArtista = resArtista.artists[0];
                const { strArtistAlternate, strArtistThumb, strGenre, strBiographyEN, strBiographyES, strFacebook, strTwitter, strLastFMChart } = infoArtista;

                let bio = strBiographyES || strBiographyEN || "No hay biografía disponible";
                let artistName = strArtistAlternate || "Nombre del artista no disponible";
                let face = strFacebook ? `<a href="https://${strFacebook}" target="_blank"><i class="fab fa-facebook"></i></a>` : "";
                let twit = strTwitter ? `<a href="https://${strTwitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : "";
                let last = strLastFMChart ? `<a href="${strLastFMChart}" target="_blank"><i class="fab fa-lastfm"></i></a>` : "";
                let redesSociales = face + twit + last;

                divArtista.innerHTML = `
                    <div class="card border-light">
                        <div class="card-header bg-primary text-light font-weight-bold">Información del Artista</div>
                        <div class="card-body">
                            <img src="${strArtistThumb}" alt="${artistName}" />
                            <h2 class="card-text">${artistName}</h2>
                            <p class="card-text">Género: ${strGenre}</p>
                            <h2 class="card-text">Biografía:</h2>
                            <p class="card-text">${bio}</p>
                            ${redesSociales}
                        </div>
                    </div>
                `;
            } else {
                divArtista.innerHTML = `<p>No se encontró información del artista.</p>`;
            }
        } catch (error) {
            console.warn("Error al cargar datos del artista:", error);
            divArtista.innerHTML = `<p>No se encontró información del artista.</p>`;
        }

        divCancion.innerHTML = `
            <div class="card border-light">
                <div class="card-header bg-primary text-light font-weight-bold">Letra de la Canción</div>
                <div class="card-body">
                    <p class="letra">${letraCancion}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error en la carga de datos:", error);
        mostrarError("#msj-error", "Ocurrió un error al cargar los datos.");
    }
};

const mostrarError = (elemento, mensaje) => {
    let divError = document.querySelector(elemento);
    divError.innerHTML = `<p class="alert alert-primary">${mensaje}</p>`;
    setTimeout(() => { divError.innerHTML = ""; }, 2000);
};

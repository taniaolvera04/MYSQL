const cargarImagenes = async () => {
    let input = document.querySelector("#busqueda").value;

    if (input === "") {
        Swal.fire({
            icon: "warning",
            title: "TIENES CAMPOS VACÍOS",
            showCancelButton: false,
            confirmButtonText: "Salir",
        })
    }
    const key = "46883888-edfcad786872c1705666eed5e";
    var URL = `https://pixabay.com/api/?key=${key}&q=${input}`;
    console.log(URL);
    const respuesta = await fetch(URL);
    const resultado = await respuesta.json();

    let imagenes = resultado.hits;
    console.log(imagenes);

    let imagenesHTML = ``;

    imagenes.map(imagen => {
        const { largeImageURL, likes, previewURL, tags, views } = imagen;

        imagenesHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card">
        <img src="${previewURL}" alt="${tags}" class="card-img-top">
        <div class="card-body">
        <p class="card-text">${likes} Me Gusta </p>
        <p class="card-text">${views} Vistas</p>
        </div>
                </div>
        </div>

        `;
    });
    let listadoImagenes = document.querySelector("#listadoImagenes");
        listadoImagenes.innerHTML = imagenesHTML;
}



const apiRick = async (pagina) => {
    let url = "https://rickandmortyapi.com/api/character/?page=" + pagina;
    const api = await fetch(url);
    const data = await api.json();
    console.log(data);
    const divRes = document.querySelector("#resultado");
    divRes.innerHTML = ""; 

    data.results.forEach(item => {
        const divItem = document.createElement('div');
        divItem.classList.add('col-md-4'); 
        divItem.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text"><b>ESTATUS:</b> ${item.status}</p>
                    <p class="card-text"><b>ESPECIE:</b> ${item.species}</p>
                    <p class="card-text"><b>GENERO:</b> ${item.gender}</p>
                </div>
            </div>
        `;
        divRes.appendChild(divItem);
    });
};

apiRick(1); 

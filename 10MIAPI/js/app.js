const cargarFilms = async () => {

    let url = "https://ghibliapi.vercel.app/films" ;

    const api = await fetch(url);
    const data = await api.json();
    console.log(data);
   
    const divRes = document.querySelector("#pelis");
    divRes.innerHTML = ""; 

    data.map(ghibli => {
        
        const divItem = document.createElement('div');
        divItem.classList.add('col-md-3'); 
        divItem.innerHTML = `
            <div class="card">
                <img src="${ghibli.image}" class="card-img-top" alt="${ghibli.name}">
  
             <div class="card-body">
               <h4 class="card-title">${ghibli.title}</b></h4>
                  
                    <p class="card-text"><b>TÍTULO ORIGINAL:</b> ${ghibli.original_title}</p>
                    <p class="card-text"><b>TÍTULO ROMANIZADO:</b> ${ghibli.original_title_romanised}</p>
                    <p class="card-text"><b>AÑO:</b> ${ghibli.release_date}</p>
                    <p class="card-text"><b>CALIFICACIÓN:</b> ${ghibli.rt_score}</p>
                    <p class="card-text"><b>DURACIÓN:</b> ${ghibli.running_time} minutos</p>  
                    <p class="card-text"><b>DIRECTOR:</b> ${ghibli.director}</p>
                    <p class="card-text"><b>PRODUCTOR:</b> ${ghibli.producer}</p>
                     
    <button class="btn btn-light m-auto" onclick="verDesc('${ghibli.id}')" data-bs-toggle="modal" data-bs-target="#mostrarDesc">
    <b>DESCRIPCIÓN
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
      </svg></b>
      </button>
      <br>


             </div>   

            </div>
        `;
        divRes.appendChild(divItem);
    });
};


const verDesc = async (id) => {
    let url = `https://ghibliapi.vercel.app/films/${id}`;
    const api = await fetch(url);
    const ghibli = await api.json();
    
   
    let titulo = document.querySelector("#titulo");
    let desc = document.querySelector("#descfilm");
    let imagen = document.querySelector("#imgfilm");

    titulo.innerHTML = ghibli.title;
    desc.innerHTML = ghibli.description;
    imagen.src = ghibli.movie_banner;  
};

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
                    <button type="button" class="btn btn-primary m-auto" onclick="verReceta(${drink.idDrink})" data-bs-toggle="modal" data-bs-target="#modalReceta">
       VER RECETA
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>
</button>
             </div>   

            </div>
        `;
        divRes.appendChild(divItem);
    });
};

//ghibli.movie_banner
//<img src="${ghibli.movie_banner}" class="card-img-top" alt="${ghibli.movie_banner}">

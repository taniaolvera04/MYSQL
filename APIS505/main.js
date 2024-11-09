const obtenerCategorias=async()=>{

    const url=`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`; 
    //console.log(url);
    
    const response= await axios.get(url);
    //console.log(response);
    
    let selectCategorias= document.querySelector("#categoria");
    
    let selectHTML=`<option value="">- Selecciona Categoria -</option>`;

    response.data.drinks.map(drink=>{
        selectHTML+= `<option value="${drink.strCategory}">${drink.strCategory}</option>`;

    });
    
    
    
    selectCategorias.innerHTML=selectHTML;
    
    }


    const obtenerRecetas = async () => {
        let ingrediente = document.querySelector("#nombre").value;
        let categoria = document.querySelector("#categoria").value;
        
        if (ingrediente.trim() === '' || categoria.trim() === '') {
            mostrarError("#msj-error", "FALTA LLENAR CAMPOS");
            return;
        }
        
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;
        //console.log(url);

        const response= await axios.get(url);
        //console.log(response);

        let divListadoRecetas= document.querySelector("#divListadoRecetas");
        let listadoHTML=`<div class="row mt-5">`;
        response.data.drinks.map(drink=>{
           listadoHTML+=`
           <div class="col-md-4 mb-3">
           <div class="card">
           <h2 class="card-header">${drink.strDrink}</h2>
           <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
           <div class="card-body">
          <button type="button" class="btn btn-primary" onclick="verReceta(${drink.idDrink})" data-bs-toggle="modal" data-bs-target="#modalReceta">
       VER RECETA
</button>
           </div>
        </div>
                  </div>
`;

});

     listadoHTML+=`</div>`;
     divListadoRecetas.innerHTML=listadoHTML;
    };
    




    const mostrarError = (elemento, mensaje) => {
        const divError = document.querySelector(elemento);
        divError.innerHTML = `<p class="alert alert-danger">${mensaje}</p>`;
        
        setTimeout(() => { divError.innerHTML = ``; }, 2000);
    };
    

    const verReceta=async(idReceta)=>{

        let tituloReceta= document.querySelector("#tituloReceta");
        let instrucciones=document.querySelector("#instruccionesReceta");
        let ingredientes=document.querySelector("#ingredientesReceta");
        let imagen= document.querySelector("#imagenReceta");
        
        if (!idReceta) return;
        
        const url=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
        console.log(url);
        
        const response= await axios.get(url);
        
        console.log(response);
        
        let info= response.data.drinks[0];
        tituloReceta.innerHTML=info.strDrink;
        instrucciones.innerHTML=info.strInstructions;
        imagen.src= info.strDrinkThumb;
        ingredientes.innerHTML=listarIngredientes(info);
        }


    const listarIngredientes=info=>{
        let listadoIngredientesHTML=``;
        for (var i=1; i<=15; i++) {
           if(info[`strIngredient${i}`]){
             listadoIngredientesHTML+= `<li>${info[`strIngredient${i}`]} - ${info[`strMeasure${i}`]}</li>`;
            }
        }
     return listadoIngredientesHTML;
    }
    
const opcionescry = async () => {
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        let selectCripto = document.querySelector("#criptomoneda");
        let opcionesHTML = "<option value=''>- SELECCIONA -</option>";

        resultado.Data.forEach(opcion => {
            opcionesHTML += `<option value="${opcion.CoinInfo.Name}">${opcion.CoinInfo.FullName.toUpperCase()}</option>`;
        });

        selectCripto.innerHTML = opcionesHTML;
    } catch (error) {
        mostrarError("#msjerror", "Error al cargar");
        console.error("Error fetching cryptos:", error);
    }
};


const cotizarMoneda = () => {
    const moneda = document.querySelector("#moneda").value;
    const cripto = document.querySelector("#criptomoneda").value;

    if (!moneda || !cripto) {
        mostrarError("#msjerror", "CAMPOS VACÍOS");
        return;
    }

    cotizar(moneda, cripto);
};


const cotizar = async (moneda = "USD", cripto = "BTC") => {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const data = resultado.DISPLAY[cripto][moneda];
        let divResultado = document.querySelector("#divResultado");


        divResultado.innerHTML = `
            <div style="text-align:center; color:gray;">
                Cargando . . .
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
</svg>
            </div>`;

        setTimeout(() => {
            divResultado.innerHTML = `
           
                <div class="precio"> <b>PRECIO:</b> <span>${data.PRICE}</span></div>
                <div class="info"> <b>PRECIO MÁS ALTO:</b> <span>${data.HIGHDAY}</span></div>
                <div class="info"> <b>PRECIO MÁS BAJO</b> <span>${data.LOWDAY}</span></div>
                <div class="info"> <b>VARIACIÓN</b> <span>${data.CHANGEPCT24HOUR}%</span></div>
                <div class="info"> <b>ÚLTIMA ACTUALIZACIÓN</b> <span>${data.LASTUPDATE}</span></div>
          
                `;
        
            }, 2000);
    } catch (error) {
        mostrarError("#msjerror", "Error al obtener la cotización.");
        console.error("Error fetching data:", error);
    }
};


const mostrarError = (elemento, mensaje) => {
    const divError = document.querySelector(elemento);
    divError.innerHTML = ` <p class="red darken-4 error">${mensaje}</p>`;

    setTimeout(() => {
        divError.innerHTML = "";
    }, 2000);
};
const cargarGrupo = async () => {
    let datos = new FormData();
    datos.append("action", "apiGrupo");
    
    const response = await fetch('php/grupo505.php', { method: 'POST', body: datos });
    let json = await response.json();
    console.log(json);
    
    var div = document.getElementById('respuesta');
    var resHTML = ``;

    // Datos en Cards
    resHTML += `<div class="card"><h3>DATOS</h3><div class="card-body">`;
    json.datos.map(r => {
        resHTML += `<p>${r.id} - ${r.nombre} ${r.ap} ${r.am} (${r.fecha}) - ${r.municipio}</p>`;
    });
    resHTML += `</div></div>`;

    // Equipos
    resHTML += `<div class="card"><h3>EQUIPOS</h3><div class="card-body">`;
    json.equipos.map(r => {
        resHTML += `<p>${r.equipo}</p>`;
    });
    resHTML += `</div></div>`;

    // Edades
    resHTML += `<div class="card"><h3>EDADES</h3><div class="card-body">`;
    json.edades.map(r => {
        resHTML += `<p>${r.edad}</p>`;
    });
    resHTML += `</div></div>`;

    // Mayor Edad
    resHTML += `<div class="card"><h3>MAYOR EDAD</h3><div class="card-body">`;
    resHTML += `<p>${json.mayoredad}</p></div></div>`;

    // Menor Edad
    resHTML += `<div class="card"><h3>MENOR EDAD</h3><div class="card-body">`;
    resHTML += `<p>${json.menoredad}</p></div></div>`;

    // Promedio Edad
    resHTML += `<div class="card"><h3>PROMEDIO EDAD</h3><div class="card-body">`;
    resHTML += `<p>${json.promedio}</p></div></div>`;

    // Suma Edades
    resHTML += `<div class="card"><h3>SUMA EDADES</h3><div class="card-body">`;
    resHTML += `<p>${json.suma}</p></div></div>`;

    // Cuantos por Municipios
    resHTML += `<div class="card"><h3>CUANTOS POR MUNICIPIOS</h3><div class="card-body">`;
    json.cuantosMunicipio.map(r => {
        resHTML += `<p>${r.municipio} -- ${r.cuantos}</p>`;
    });
    resHTML += `</div></div>`;

    // Cuantos por Equipo
    resHTML += `<div class="card"><h3>CUANTOS POR EQUIPO</h3><div class="card-body">`;
    json.cuantosEquipo.map(r => {
        resHTML += `<p>${r.equipo} - ${r.cantidad}</p>`;
    });
    resHTML += `</div></div>`;

    // Cuantos por Signo
    resHTML += `<div class="card"><h3>CUANTOS POR SIGNO</h3><div class="card-body">`;
    json.cuantosSigno.map(r => {
        resHTML += `<p>${r.signo} - ${r.cuantos}</p>`;
    });
    resHTML += `</div></div>`;

    div.innerHTML = resHTML;
};

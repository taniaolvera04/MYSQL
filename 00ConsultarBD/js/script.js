const BD = async () => {
    let datos = new FormData();
    datos.append('action', 'showDB');

    try {
        const response = await fetch("php/gestionBD.php", {
            method: 'POST',
            body: datos
        });

        let res = await response.json();
        console.log(res);

        let BD_HTML = '';
        let divDB = document.getElementById("bd");

        res.forEach(bd => {
            BD_HTML += `<button class="btn btn-success" onclick="verTablas('${bd.Database}')">${bd.Database}</button>
            <br>`;
        });

        divDB.innerHTML = BD_HTML;
    } catch (error) {
        console.error('Error fetching databases:', error);
    }
}



const verTablas = async (bd) => {
    let datos = new FormData();
    datos.append('bd', bd);
    datos.append('action', 'showTables');

    try {
        const response = await fetch("php/gestionBD.php", {
            method: 'POST',
            body: datos
        });

        let res = await response.json();
        console.log(res);

        let DB_HTML = '';
        let divDB = document.getElementById("tablas");

        res.forEach((valor) => {
            DB_HTML += `<p><button class="btn btn-info">${Object.values(valor)[0]}</button></p>`;
        });

        divDB.innerHTML = DB_HTML;
    } catch (error) {
        console.error('Error fetching tables:', error);
    }
}

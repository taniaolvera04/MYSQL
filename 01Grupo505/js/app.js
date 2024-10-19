const cargarGrupo = async () => {
    const datos = new FormData();
    datos.append("action", "apiGrupo");

        let respuesta = await fetch('php/grupo505.php', { method: 'POST', body: datos });
        let json = await respuesta.json();

        console.log(json);
}
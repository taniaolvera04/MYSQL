async function fetchNews() {
    const category = document.getElementById('category').value;
    const apiKey = '1f6fac66129d4926b4284419fa00bbd8';
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;


    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    try {
        const response = await fetch(url);
        const data = await response.json();


        const newsContainer = document.getElementById('newsContainer');
        newsContainer.innerHTML = '';


        loader.style.display = 'none';


        if (data.articles.length > 0) {
            data.articles.forEach(article => {
                const newsElement = document.createElement('div');
                newsElement.classList.add('news');

                newsElement.innerHTML = `
                    <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="Imagen de la noticia" >
                    <h3>${article.title}</h3>
                    <p>${article.description || 'No hay descripción disponible'}</p>
                    <a href="${article.url}"  target="_blank">Leer más</a>
                `;
                newsContainer.appendChild(newsElement);
            });
        } else {
            newsContainer.innerHTML = '<p>No se encontraron noticias para esta categoría.</p>';
        }
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        loader.style.display = 'none';
    }
}
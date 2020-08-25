/**
 * Desafio Frontend Cubos
 * 
 * @description Desafio para processo seletivo de desenvolvedor Frontend na Cubos
 * @author Cadu Eduardo Santos
 * @date 25/08/2020
 */

/**
 * Variáveis com dados para busca na API
 */
const apiKey = '065114077dd3f2e4e223b6bd438a1a14'
const image_url = 'https://image.tmdb.org/t/p/w500/'
const base_url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`
const language = '&language=pt-BR'

/**
 * Seletores usados na página para renderização e busca dos filmes
 */
const list = document.querySelector('.movies-list')
const inputSearch = document.querySelector('#search')

const imagePosterNotFound = `https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg`

/**
 * Realiza busca de filmes na API do TheMovieDB através 
 * do termo digitado no input
 *  
 * @param {*} searchedTerm Termo a ser pequisado 
 */
const getMovies = async searchedTerm => {

    let movies = null;
    if (searchedTerm) {
        let url = `${base_url}&query=${searchedTerm}${language}`
        const response = await fetch(url)
        let data = await response.json()
        movies = data.results
    }
    return movies
}

/**
 * Busca imagem do poster através da combinação o path retornado pela API
 * 
 * @param {string} posterUrl URL/Path do poster
 * @returns {string} imageURL
 */
const getMoviePoster = posterUrl => {
    if (posterUrl) {
        return `${image_url}${posterUrl}`
    } else {
        return imagePosterNotFound;
    }
}

const listMovies = async searchedTerm => {
    const movies = await getMovies(searchedTerm)

 if (movies) {
        list.innerHTML = ""
        
        movies.map(({ poster_path, title, vote_average, release_date, overview}) => {
            const tela =
                `<div class="movies">
                <img class="img-movie" src="${getMoviePoster(poster_path)}" alt="${title}" />
                <div class="content">
                    <div class="title">
                        <h2>${title}</h2>
                    </div>
                    <div class="score">
                        <span>${vote_average}%</span>
                    </div>
                    <span class="date">${release_date}</span>
                    <div class="description">
                        <p>${overview}</p>
                    </div>
                    <div class="tags">
                        <span>Ação</span>
                        <span>Aventura</span>
                        <span>Fantasia</span>
                    </div>
                </div>
            </div>
            `
            list.innerHTML += tela
        });
    }
}

/**
 * Adiciona listener para busca filmes no evento de mudança do input 
 */
inputSearch.addEventListener('keyup', event => {
    let searchedTerm = event.target.value
    listMovies(searchedTerm)
})


/**
 * paginação
 */

// const arr = []
// let page = 1

// for(let i = 0; i <= movies.length; i++){
//     let li = document.createElement('li')
//     li.textContent = `Item ${i}`
//     arr.push(li)
//     console.log(arr)
// }

// for(let i =0; i < page+ 5; i++) {
//    teste.appendChild(arr[i])
// }

// n.addEventListener('click', () => {
//     page == arr.length - 5 ? (page = 0) : (page += 5)
//     for(let i = page; i < page + 5; i++ ){
//         teste.appendChild(arr[i])
//     }
// })

// b.addEventListener('click', () => {
//     page == 0 ? page = arr.length -5 : (page -= 5)
//     for(let i = page; i < page + 5; i++ ){
//         teste.appendChild(arr[i])
//     }
// })

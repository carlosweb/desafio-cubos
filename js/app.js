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
const API_KEY = '065114077dd3f2e4e223b6bd438a1a14'
const image_url = 'https://image.tmdb.org/t/p/w500/'
// const base_url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`
// const language = '&language=pt-BR'

/**
 * Seletores usados na página para renderização e busca dos filmes
 */
const showList = document.querySelector('.movies-list')
const inputSearch = document.querySelector('#search')

const imagePosterNotFound = `https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg`


// const firstFetch = async movie => {
//     const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}`)
//     const data = await response.json()
//     const listMovies = data.results
//     return listMovies
// }

// const secondFetch = async (movie, ids) => {
//     const id = await firstFetch(movie)
//     console.log(id)
//     const idMovies = id.results[0].id
//     console.log(idMovies)

//     let arrayMovies = []
//     arrayMovies.push(idMovies) 
//     console.log(arrayMovies)
//     arrayMovies.map(ids => console.log(ids.results) )

//     const response = await fetch(`https://api.themoviedb.org/3/movie/${ids}?api_key=${API_KEY}`)
//     const data = await response.json()
//     console.log(data)
// }


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


// const listMovies = async movie => {
//     const movies = await secondFetch(movie)

//     const list = []
//     list.push(movies)


//         list.map(( { poster_path, title, vote_average, release_date, overview, genres  } ) => {
//             const screen = 
//             `
//             <div class="movies">
//                 <img class="img-movie" src="${getMoviePoster(poster_path)}" alt="${title}" />
//                 <div class="content">
//                     <div class="title">
//                         <h2>${title}</h2>
//                     </div>
//                     <div class="score">
//                         <span>${vote_average}%</span>
//                     </div>
//                     <span class="date">${release_date}</span>
//                     <div class="description">
//                         <p>${overview}</p>
//                     </div>
//                     <div class="tags">
//                         ${genres.map(genre => `<span>${genre.name}</span>`).join('')}
//                     </div>
//                 </div>
//             </div>
//         `
//             showList.innerHTML += screen
//         })
// }




const getMovieUrl = movie => `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}`

const getMovies = async movie => {
    try {
        const movieUrl = getMovieUrl(movie)
        const response = await fetch(movieUrl)

        if (!response.ok) {
            throw new Error('Não foi possivel obter os dados')
        }
        const { results } = await response.json()
        return results.slice(0, 5)
        
    } catch ({ name, message }) {
        console.log(`${name} : ${message}`)
    }
}

const getListMovies = async movie => {

    try {
    
        const id = await getMovies(movie)
        
        let teste = id.map(ids => ids.id)
    
        const movieIdUrl = `https://api.themoviedb.org/3/movie/${teste}?api_key=${API_KEY}`
        const response = await fetch(movieIdUrl)
        
        if (!response.ok) {
            throw new Error('Não foi possivel obter os dados')
        }
        const movieDataId = await response.json()

        return movieDataId
         
    } catch ({ name, message }) {
        console.log(`${name} : ${message}`)
    }
}

const showLisMovies = async movie => {
    const movies = await getMovies(movie)

    const { genres } = await getListMovies(movie)
    const nameGenre =  genres.map(genre => genre.name)

    if (movies) {
        showList.innerHTML = ""
        movies.map(item => {
        
            const screen =
                `
            <div class="movies">
                     <img class="img-movie" src="${getMoviePoster(item.poster_path)}" alt="${item.title}" />
                     <div class="content">
                         <div class="title">
                             <h2>${item.title} ${item.id}</h2>
                         </div>
                         <div class="score">
                            <span>${item.vote_average}%</span>
                         </div>
                         <span class="date">${item.release_date}</span>
                        <div class="description">
                             <p>${item.overview}</p>
                         </div>
                         <div class="tags">
                        ${nameGenre}
                        
                     </div>
                  </div>
              </div>
            `
            showList.innerHTML += screen
        })
    }
}


inputSearch.addEventListener('keyup', event => {
    const input = event.target.value
    showLisMovies(input)
})


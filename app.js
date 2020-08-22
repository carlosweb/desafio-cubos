const list = document.querySelector('.movies-list')
const inputSearch = document.querySelector('#search')
const inputValue = inputSearch.value
const apiKey = '065114077dd3f2e4e223b6bd438a1a14'
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=arnold`


const getMovies = async () => {
    const response = await fetch(url)
    return await response.json()
}

const listMovies = async () => {
    const data = await getMovies()
    const movies = data.results

    const teste = movies.map(name => name.original_title)
    console.log(teste.join())

    list.innerHTML = `<p>${teste}</p>`
}

listMovies()

// inputSearch.addEventListener('change', event => {
//     event.preventDefault()

//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             const movies = data.results 
//             console.log(movies.original_title)
//         })
// })


const renderList = movie => {
    // list.innerHTML = ''
    const movieView = `
        <div class="movies">
            <img  class="img-movie" src="https://i.pinimg.com/originals/5d/68/49/5d6849092aea2a932f2a7f201bea4a66.jpg" alt="" />
            <div class="content">
                <div class="title">
                    <h2>${movie.original_title}</h2>
                </div>
                <div class="score">
                        <span>75%</span>
                </div>
                <span class="date">25/10/2017</span>
                <div class="description">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, natus mollitia. A
                        suscipit dicta debitis iure magni sint nesciunt, accusamus ab cum ut, quod provident
                        natus maiores sunt vel obcaecati.</p>
                </div>
                <div class="tags">
                    <span>ação</span>
                    <span>Aventura</span>
                    <span>Fantasia</span>
                </div>
            </div>
        </div>
        `
    list.innerHTML = movieView
}




import React, {useState} from 'react'

import MovieCard from './MovieCard'

export default function SearchMovies(){

  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])

  const searchMovies = async (e) => {
    
    e.preventDefault()
    const url = `https://api.themoviedb.org/3/search/movie?api_key=42c0c85fb6ab5d72b80a16d07a63aeac&language=en-US&query=${query}&page=1&include_adult=false`

    try {
      const res = await fetch(url)
      const data = await res.json()
      setMovies(data.results)
    }
    catch(error){
      console.log("error")
    }
  }

  return(
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">Movie name</label>
        <input className="input" type="text" name="query" placeholder="Write your movie here!" value={query} onChange={(e) => setQuery(e.target.value)}></input>
        <button className="button" type="submit">Search</button>
      </form>

      <div className="cardList">
        {movies.filter(movie => movie.poster_path).map(movie => (<MovieCard movie={movie} key={movie.id}/>))}
      </div>
    </>
  );
}
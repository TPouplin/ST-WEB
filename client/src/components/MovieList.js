import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import './MovieList.css'
//Renvoie la liste des films 
const MovieList = ()=>{

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movies, setMovies] = useState([]);
    
    useEffect(()=>{
        fetchMovies()
        
    },[])
    const fetchMovies = async () => {
      try {
        // on recuperera ici la liste de films
        // const response = await fetch("");
        // const responseJson = await response.json();
        // setIsLoaded(true);
        // setError(false);
        // setMovies(responseJson.results);
        setMovies([{movieId:1,title:"Film 1 "},{movieId:2,title:"Film 2"}])
        setIsLoaded(true)
      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    };
  
    const displayMovies = () => {
      if (error) {
        return <div>Erreur: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Chargement...</div>;
      } else {
        return (
          <ul>
            {movies.map((movie) => (
              <li key={movie.movieId}><Link className="list-link" to={'/movie/'+movie.movieId}>{movie.title}</Link></li>
            ))}
          </ul>
        );
      }
    };
  
    return (
      <div>
        {displayMovies()}
      </div>
    );
}

export default MovieList

import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
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
        setMovies([])
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
              <li key={movie.id}><Link to={'/movie/'+movie.id}>{movie.name}</Link></li>
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

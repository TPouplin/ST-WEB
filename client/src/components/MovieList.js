import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import './MovieList.css'
import './Button.css'
//Renvoie la liste des films 
const MovieList = ()=>{

    const [error, setError] = useState(null);
    const [page,setPage] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false);
    const [movies, setMovies] = useState([]);
    
    useEffect(()=>{
        fetchMovies()
        
    },[])
    const fetchMovies = async () => {
      try {
        //on recuperera ici la liste de films
        const response = await fetch("https://b6b8xoxbi0.execute-api.eu-west-1.amazonaws.com/dev/list_f");
        const responseJson = await response.json();
        setIsLoaded(true);
        setError(false);
        console.log(responseJson)
        setMovies(responseJson);
        // setMovies([
        //   {movieId:1,title:"Film 1 ",genres:['action','thriller','dramatique']},
        //   {movieId:2,title:"Film 2",genres:['comédie','société']},
        //   {movieId:3,title:"Film 3 ",genres:['action','thriller','dramatique']},
        //   {movieId:4,title:"Film 4 ",genres:['action','thriller','dramatique']},
        //   {movieId:5,title:"Film 5 ",genres:['action','thriller','dramatique']},
        //   {movieId:6,title:"Film 6 ",genres:['action','thriller','dramatique']},
        //   {movieId:7,title:"Film 7 ",genres:['action','thriller','dramatique']},
        //   {movieId:8,title:"Film 8 ",genres:['action','thriller','dramatique']},
        //   {movieId:9,title:"Film 9 ",genres:['action','thriller','dramatique']},
        //   {movieId:10,title:"Film 10 ",genres:['action','thriller','dramatique']},
        //   {movieId:11,title:"Film 11 ",genres:['action','thriller','dramatique']},
        //   {movieId:12,title:"Film 12 ",genres:['action','thriller','dramatique']},
        //   {movieId:13,title:"Film 13 ",genres:['action','thriller','dramatique']},
        //   {movieId:14,title:"Film 14 ",genres:['action','thriller','dramatique']},
        //   {movieId:15,title:"Film 15 ",genres:['action','thriller','dramatique']},
        //   {movieId:16,title:"Film 16 ",genres:['action','thriller','dramatique']},
        //   {movieId:17,title:"Film 17 ",genres:['action','thriller','dramatique']},
        //   {movieId:18,title:"Film 18 ",genres:['action','thriller','dramatique']},
        //   {movieId:19,title:"Film 19 ",genres:['action','thriller','dramatique']},
        //   {movieId:20,title:"Film 20 ",genres:['action','thriller','dramatique']},
        //   {movieId:21,title:"Film 21 ",genres:['action','thriller','dramatique']},
        //   {movieId:22,title:"Film 22 ",genres:['action','thriller','dramatique']},
        //   {movieId:23,title:"Film 23 ",genres:['action','thriller','dramatique']}])
          
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
          <div>
            <div className="movie-list-container">
              {movies.slice((page-1)*9,page*9).map((movie) => (
                <div className="movie-container" key={movie.uuid}>
                  <Link className="list-link" to={'/movie/'+movie.uuid}>{movie.name}</Link>
                  <div className="movie-genres">
                    {movie.tag.map((genre)=> (
                      <p className="movie-genre">{genre}</p>
                    ))}
                  </div>
                  </div>
              ))}
            </div>
              <div className="pagination">
                {page!==1 && (<button className="previous-button pagination-button" onClick={()=>setPage(page-1)}>Page précédente</button>)}
                {(page!==Math.ceil(movies.length/9) &&movies.length>9) &&(<button className="next-button pagination-button" onClick={()=>setPage(page+1)}>Page suivante</button>)}
              </div>
            </div>
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

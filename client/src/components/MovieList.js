import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import './MovieList.css'
import './Button.css'
//Renvoie la liste des films 
const MovieList = ()=>{

    const [error, setError] = useState(null);
    const [page,setPage] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false);
    const [displayedMovies,setDisplayedMovies] = useState([])
    const [movies, setMovies] = useState([]);
    const [search,setSearch] = useState('')
    
    useEffect(()=>{
        fetchMovies()
        
    },[])

    useEffect(()=>{
      setDisplayedMovies(movies.filter((movie)=>movie.name.toLowerCase().includes(search.toLowerCase())))
    },[search,movies])
    const fetchMovies = async () => {
      try {
        //on recuperera ici la liste de films
        const response = await fetch("https://b6b8xoxbi0.execute-api.eu-west-1.amazonaws.com/dev/list_f");
        const responseJson = await response.json();
        setIsLoaded(true);
        setError(false);
        console.log(responseJson)
        setMovies(responseJson);
        
        setIsLoaded(true)
      } catch (error) {
        setIsLoaded(true);
        console.log(error)
      }
    };
    
    
      if (error) {
        return <div>Erreur: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Chargement...</div>;
      } else {
        return (
          <div className="page-container">
            <input className="movie-search" type="text" placeholder="Recherchez un film par son titre" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <div className="movie-list-container">
              {displayedMovies.slice((page-1)*9,page*9).map((movie) => (
                <div className="movie-container" key={movie.uuid}>
                  <Link className="list-link"  to={{pathname:'/movie/'+movie.uuid,state:{movie}}}>{movie.name}</Link>
                  <p>{movie.date}</p>
                  <div className="movie-genres">
                    {movie.tag && movie.tag.map((genre)=> (
                      <p className="movie-genre" key={genre}>{genre}</p>
                    ))}
                  </div>
                  </div>
              ))}
            </div>
              <div className="pagination">
                {page!==1 && (<button className="previous-button pagination-button" onClick={()=>setPage(page-1)}>Page précédente</button>)}
                {(page!==Math.ceil(displayedMovies.length/9) &&displayedMovies.length>9) &&(<button className="next-button pagination-button" onClick={()=>setPage(page+1)}>Page suivante</button>)}
              </div>
            </div>
        );
      }
    
  
    
}

export default MovieList

import React,{useState} from "react";
import {Link} from 'react-router-dom'
import Header from './Header'
import MovieList from './MovieList'
import "./HomePage.css";
import "./Button.css"
const HomePage = () => {

  const [recommendation,setRecommendation] = useState(null)
  //Fonction pour recevoir une recommendation 
  const getRecommendation = ()=>{

  }

  return (
    <div className="HomePage">
          <Header/>
        
          <button className="button" onClick={getRecommendation}>Recevoir une recommendation</button>
          {recommendation && (<Link to={'/movie/'+recommendation.movieId}><p>{recommendation.title}</p></Link>)} 

          <h3>Liste de films : </h3>
          <MovieList/>
        
        
    </div>
  );
};

export default HomePage;

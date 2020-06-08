import React,{useState} from "react";
import Header from './Header'
import MovieList from './MovieList'
import "./HomePage.css";

const HomePage = () => {

  const [recommendation,setRecommendation] = useState(null)
  //Fonction pour recevoir une recommendation 
  const getRecommendation = ()=>{

  }

  return (
    <div>
        <Header/>
        <button onClick={getRecommendation}>Recevoir une recommendation</button>
        {recommendation && (<p>recommendation</p>)} 

        <h3>Liste de films : </h3>
        <MovieList/>
    </div>
  );
};

export default HomePage;

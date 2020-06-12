import React,{useState} from "react";
import {Link} from 'react-router-dom'
import Header from './Header'
import MovieList from './MovieList'
import "./HomePage.css";
import "./Button.css"
const HomePage = () => {

  const [recommendation,setRecommendation] = useState(null)
  const [displayRecommendation,setDisplayRecommendation] = useState(true)
  //Fonction pour recevoir une recommendation 
  const getRecommendation = async ()=>{
    const response = await fetch("https://nrxfc2lxz1.execute-api.eu-west-1.amazonaws.com/dev/recommandation",{method:"POST",body:JSON.stringify({user_id:localStorage.getItem('pseudo')})})
    const responseJson = await response.json()
    console.log(responseJson)
    if(responseJson.length>0) {
      setRecommendation(responseJson[0])
      setDisplayRecommendation(false)
    }
  }

  return (
    <div className="HomePage">
          <Header/>
          {displayRecommendation && (<button className="button" onClick={getRecommendation}>Recevoir une recommendation</button>)}
          
          
          {recommendation && (<div>
            <h2 className="recommendation-title">Film recommendé</h2>
            <div className="recommendation-container" key={recommendation.uuid}>
              <Link className="list-link"  to={{pathname:'/movie/'+recommendation.uuid,state:{movie:recommendation}}}>{recommendation.name}</Link>
              <p>{recommendation.date}</p>
              <div className="movie-genres">
                {recommendation.tag && recommendation.tag.map((genre)=> (
                  <p className="movie-genre" key={genre}>{genre}</p>
                  ))}
            </div>
          </div>
          </div>
          )
        } 

          
          <MovieList/>
        
        
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import "../MovieList.js";
import "./FilmPage.css";
import {withRouter} from 'react-router-dom';


var obj = {name:"Benjamin Button", genre:["Drama", "comedie", "romance"], actors: ["Brad Pitt", "Taraji P. Henson", "Tilda Swinton"], date:"2008"};
const img_url = "https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png"


const mailcode = (r) => {
  fetch( "https://b6b8xoxbi0.execute-api.eu-west-1.amazonaws.com/dev/ratings", {method : "POST", 
  body : JSON.stringify({pseudo: localStorage.getItem('pseudo'), movieId:obj.uuid.toString(), rate: r.toString()})}
  )
}

const FilmPage = (props) => {
  /*
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const triggerFetchAgain = () => setFetchAgain(!fetchAgain);


  const fetchExample = async () => {
    
    try {
      const response = await fetch("https://b6b8xoxbi0.execute-api.eu-west-1.amazonaws.com/dev/film/exemple2");
      const responseJson = await response.json();
      setIsLoaded(true);
      setError(false);
      setItems(responseJson.results);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };

  useEffect(() => {
    setIsLoaded(false);
    fetchExample();
    // The useEffect hook will retrigger every time an element in the dependency array changes.
    // changes = strict egality, so beware when mutating objects
  }, [fetchAgain]);
  const Film = () => {
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      */
     obj = props.location.state.movie
      return (
        <div>
          <div class = "hero">
            <link rel="stylesheet" type="text/css" href="FilmPage.css"/>
            <h2>{obj.name}</h2>
            <img src = {img_url}/>
            <h1>produced in {obj.date} </h1>
            <h1> genres </h1>
            <ul>
              {obj.tag.map((genre) => <li>{genre}</li>)}
            </ul>
            <h1>How did you find {obj.name} ?</h1>
            <button class="btn Vbad" onClick = {mailcode(1)}>Very Bad</button>
            <button class="btn bad" onClick = {mailcode(2)}>Bad</button>
            <button class="btn fair" onClick = {mailcode(3)}>Fair</button>
            <button class="btn good" onClick = {mailcode(4)}>Good</button>
            <button class="btn excellent" onClick = {mailcode(5)} >Excellent </button> 
          </div>
        </div>
      );
      /*
    }
  };
            
  return (
    <div>
      <button onClick={triggerFetchAgain}>Fetch again</button>
      {Film()}
    </div>
  );
  */
};

export default withRouter(FilmPage);


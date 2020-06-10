import React, { useState, useEffect } from "react";
import "../MovieList.js";
import "./FilmPage.css";


var obj = {name:"Benjamin Button", director:"David Fisher", actors: ["Brad Pitt", "Taraji P. Henson", "Tilda Swinton"], year:"2008"};
const img_url = "https://img.aws.la-croix.com/2017/01/08/1100815592/Lhistoire-homme-vieillard-meurt-nourrissonavoir-rebours_0_730_489.jpg"
var rate = 0


const FilmPage = () => {
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
      
      return (
        <div>
          <div class = "hero">
            <link rel="stylesheet" type="text/css" href="FilmPage.css"/>
            <h2>{obj.name}</h2>
            <img src = {img_url}/>
            <h1>produced in {obj.year} by {obj.director}</h1>
            <h1> Actors </h1>
            <ul>
              {obj.actors.map((actor) => <li>{actor}</li>)}
            </ul>
            <h1>How did you find {obj.name} ?</h1>
            <button class="btn Vbad" onClick = {rate = 1}>Very Bad</button>
            <button class="btn bad" onClick = {rate = 2}>Bad</button>
            <button class="btn fair" onClick = {rate = 3}>Fair</button>
            <button class="btn good" onClick = {rate = 4}>Good</button>
            <button class="btn excellent" onClick = {rate = 5} >Excellent</button> 
          </div>
        </div>
      );
    }
  };
            
  return (
    <div>
      <button onClick={triggerFetchAgain}>Fetch again</button>
      {Film()}
    </div>
  );
};

export default FilmPage;


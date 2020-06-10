import React, { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating";
import "../MovieList.js";
import "./FilmPage.css";
import Rating from "./rating.js";

var obj = {name:"Benjamin Button", director:"David Fisher", actors: ["Brad Pitt", "Taraji P. Henson", "Tilda Swinton"], year:"2008"};

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
          <link rel="stylesheet" type="text/css" href="FilmPage.css"/>
          
          <div class = "hero">
            <h2>{obj.name}</h2>
            <img src = "https://img.aws.la-croix.com/2017/01/08/1100815592/Lhistoire-homme-vieillard-meurt-nourrissonavoir-rebours_0_730_489.jpg"/>
            <h1>produced in {obj.year} by {obj.director}</h1>
            <h1> Actors </h1>
            <ul>
              {obj.actors.map((actor) => <li>{actor}</li>)}
            </ul>
          </div>
          <Rating/>
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


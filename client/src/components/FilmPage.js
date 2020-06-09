import React, { useState, useEffect } from "react";


var attributes = ["durée: ", "genre: ", "acteurs: ", "réalisateur: " ] + ["WIP"]*50;

const FilmPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const triggerFetchAgain = () => setFetchAgain(!fetchAgain);


  const fetchExample = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
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
        <ul>
          {items.map((item, i) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
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

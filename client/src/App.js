import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FilmPage from "./components/FilmPage";
=======
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
>>>>>>> origin/arthur
=======
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FilmPage from "./components/FilmPage";
>>>>>>> 096c9a22418072407ec861d9ad9ee1f7a2ecac60
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 096c9a22418072407ec861d9ad9ee1f7a2ecac60
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/demo">Film Page</Link>
            </li>
          </ul>
        </nav>
<<<<<<< HEAD
=======
        
>>>>>>> origin/arthur
=======
>>>>>>> 096c9a22418072407ec861d9ad9ee1f7a2ecac60
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/demo">
            <FilmPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

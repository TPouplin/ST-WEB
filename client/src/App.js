import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FilmPage from "./components/FilmPage";
=======
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
>>>>>>> origin/arthur
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <div>
<<<<<<< HEAD
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
=======
        
>>>>>>> origin/arthur
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

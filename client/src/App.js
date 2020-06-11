import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
import HomePage from "./components/HomePage";
import NewMoviePage from './components/NewMoviePage';
import LoginPage from './components/LoginPage'

function App() {
  return (
    <Router>
      <div>
        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/demo">
            <PokemonDisplayer />
          </Route>
          <Route exact path="/">
            <LoginPage/>
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/new_movie">
            <NewMoviePage />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;

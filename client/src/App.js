import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FilmPage from "./components/FilmPage/FilmPage"
import HomePage from "./components/HomePage";
import NewMoviePage from './components/NewMoviePage';
import LoginPage from './components/LoginPage'
import {createBrowserHistory} from 'history'
export const history = createBrowserHistory()
function App() {
  return (
    <Router>
      <div>
        
        <Switch>
          <Route path = "/movie/:movieId">
            <FilmPage />
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

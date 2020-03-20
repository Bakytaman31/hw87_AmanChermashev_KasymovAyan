import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Posts from "./containers/Posts/Posts";
import NavBar from "./components/UI/NavBar/NavBar";
import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import NewPost from "./containers/NewPost/NewPost";
import Post from "./containers/Post/Post";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path="/" exact component={Posts}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/registration" exact component={Registration}/>
        <Route path="/newPost" exact component={NewPost}/>
        <Route path="/:id" component={Post}/>
      </Switch>
    </div>
  );
}

export default App;

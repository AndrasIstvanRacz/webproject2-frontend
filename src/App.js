import './App.css';
import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import MyToDoList from "./components/ToDo/MyToDoList";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/registration" component={Registration}/>
            <Route path="/todolist"
                   component={MyToDoList}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;


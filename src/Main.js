import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import TodoList from "./TodoList";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Twój organizer!!!</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/todoList">Lista rzeczy do zrobienia</NavLink></li>
                        <li><NavLink to="/shoppingList">Lista zakupów</NavLink></li>
                        <li><NavLink to="/birthdaysList">Urodzinowa przypominajka</NavLink></li>
                        <li><NavLink to="/calendar">Kalendarz</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/todoList" component={TodoList}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;
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
                    <div class="parallax"></div>
                    <h1 align = "right"><font color="black" size="50px">Twój organizer</font></h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li>Listy
                        <ul>
                            <li><NavLink to="/todoList">Lista "todo"</NavLink></li>
                            <li><NavLink to="/shoppingList">Lista zakupów</NavLink></li>
                            <li><NavLink to="/birthdaysList">Urodzinowa przypominajka</NavLink></li>
                        </ul></li>
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
import React, {Component} from "react";

const Title = ({todoCount}) => {
    return (
        <div>
            <div>
                <h2>Lista rzeczy do zrobienia liczy obecnie: ({todoCount}) pozycji!</h2>
            </div>
        </div>
    );
};

const Todo = ({todo, remove}) => {
    return (
        <div className="list-group-item" onClick={() => {
            remove(todo.id)
        }}><u>Zadanie:</u> {todo.text} <u>Priorytet:</u> {todo.priority}</div>
    )
}

const TodoList = ({todos, remove}) => {
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove}/>)
    });

    return (<div className="list-group" style={{marginTop: '30px'}}>{todoNode}</div>);
}

const TodoForm = ({addTodo}) => {
    let input;
    let priority;
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            addTodo(input.value, priority.value);
            input.value = '';
            priority.value = 1;
        }}>
            <input className="form-control col-md-12" ref={node => {
                input = node;
            }}  placeholder={"Wpisz zadanie"}/>

            <div className="form-group">
                <label>Priorytet: </label>
                <select className="form-control" ref={node => priority = node}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>

            <br/>
        </form>
    );
};

window.id = 0;

class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.allStorage(),
        };
    }

    componentDidMount() {
        this.setState({data: this.state.data});
    }

    addTodo = (val, priority) => {
        localStorage.setItem("todo." + val, priority);
        const todo = {text: val, id: window.id++, priority: priority};
        this.setState({data: this.state.data.concat([todo]).sort((a, b) => a.priority - b.priority)});
    }

    handleRemoveFromTodos(id) {
        const toDelete = this.state.data.filter((todo) => {
            if (todo.id === id) return todo;
        });

        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id) return todo;
        });
        this.setState({
            data: remainder
        });

        localStorage.removeItem("todo." + toDelete[0].text);
    }

    allStorage() {
        var archive = [],
            keys = Object.keys(localStorage),
            i = 0, key;

        for (; key = keys[i]; i++) {
            if(key.startsWith("todo.", 0)) {
                const todo = {text: key.substring(5), id: window.id++, priority: localStorage.getItem(key)};
                archive.push(todo);
            }
        }

        return archive.sort((a, b) => a.priority - b.priority);
    }

    render() {
        return (
            <div className="componentContainer">
                <Title todoCount={this.state.data.length}/>
                <TodoForm addTodo={this.addTodo}/>
                <h2>Do zrobienia:</h2>
                <TodoList
                    todos={this.state.data}
                    remove={this.handleRemoveFromTodos.bind(this)}
                />
            </div>
        );
    }
}


export default TodoComponent;
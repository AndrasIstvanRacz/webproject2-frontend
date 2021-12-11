import React from "react";
import "./MyToDoListStyle.css"
import axios from "axios";

class MyToDoList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: '',
      todos: [],
      newTodo: "",
      changedToDo: ""
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      token: props.location.state.token,
      username: props.location.state.username
    }
  }

  componentDidMount() {
    this.getTodo()
  };

  getTodo = () => {
    let self = this
    let newTodos = []
    axios.get('/api/todo/getAllByUserName?username=' + this.state.username,
      {
        headers: {
          Authorization: "Bearer " + this.state.token
        }
      })
      .then(function (response) {
        response.data.map((item) => (
          newTodos.push(item)
        ))
        self.setState({todos: newTodos})
        console.log('Todos: ')
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addToDo = event => {
    let self = this
    event.preventDefault()
    axios.post('/api/todo/addNew?username=' + this.state.username,
      {
        id: 1,
        title: self.state.newTodo
      }, {
        headers: {
          Authorization: "Bearer " + this.state.token
        }
      })
      .then(function (response) {
        self.setState({newTodo: ""})
        console.log("New item added: ");
        console.log(response);
        self.getTodo()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteToDo = (event, id) => {
    let self = this
    event.preventDefault()
    axios.post('/api/todo/deleteItem?username='
      + this.state.username
      + '&id='
      + id,
      {}, {
        headers: {
          Authorization: "Bearer " + this.state.token
        }
      })
      .then(function (response) {
        console.log("Delete: ");
        console.log(response);
        self.getTodo()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateToDo = (event, id) => {
    if (event.key === 'Enter') {
      let self = this
      event.preventDefault()
      axios.put('/api/todo/editItem?username='
        + this.state.username,
        {
          id: id,
          title: self.state.changedToDo
        }, {
          headers: {
            Authorization: "Bearer " + this.state.token
          }
        })
        .then(function (response) {
          self.setState({changedToDo: ""})
          console.log("Update: ");
          console.log(response);
          self.getTodo()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    this.setState({changedToDo: ""})
  }

  render() {
    return (
      <div className="toDoContainer">
        <div>
          <h1>{this.state.username}'s to-do list</h1>
        </div>
        <div className="addTodo">
          <input className="addToDoInput" type="text"
                 onChange={e => this.setState(
                   {...this.state, newTodo: e.target.value})}
                 value={this.state.newTodo}
                 placeholder="New todo">
          </input>
          <button className="addToDoButton" onClick={this.addToDo}>Add</button>
        </div>
        {this.state.todos.map((todo, index) => (
          <div className="todoItem"
               key={index}>
            <input className="toDoName"
                   type="text"
                   onChange={e => this.setState(
                     {...this.state, changedToDo: e.target.value})}
                   onKeyDown={(e) =>
                     this.updateToDo(e, todo.id)}
                   defaultValue={this.state.todos[index].title}/>
            <button className="deleteButton"
                    onClick={(e) =>
                      this.deleteToDo(e, todo.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    )
  };
}

export default MyToDoList;
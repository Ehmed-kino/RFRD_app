import React, { Component } from "react";
import "./App.css";

import request from "es6-request";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      newItem: null
    };
    this.addItems = this.addItems.bind(this);
    this.onNewItemChange = this.onNewItemChange.bind(this);
  }

  onNewItemChange(e) {
    this.setState({ newItem: e.target.value });
  }

  addItems(item) {
    let newItem = this.state.newItem;
    let newId = this.state.newItem;
    // console.log(newId);

    request
      .put("http://localhost:5000/todos/item" + newId)
      .send(newItem)
      .then(([body, res]) => {
        this.updateTodoList();
      });
  }

  componentDidMount() {
    this.updateTodoList();
  }

  updateTodoList() {
    request.get("http://localhost:5000/todos/").then(([body, res]) => {
      let result = JSON.parse(body);
      this.setState({
        todoList: result,
        newId: Object.keys(result).length + 1
      });
    });
  }

  render() {
    let todos = [];
    for (let key in this.state.todoList) {
      todos.push(<p key={key}>- {this.state.todoList[key]}</p>);
    }
    return (
      <div className="App">
        <h2>Todo list:</h2>
        {todos}
        <input type="text" id="TX_NewItem" onChange={this.onNewItemChange} />
        <button onClick={this.addItems}>Add to list</button>
      </div>
    );
  }
}

export default App;

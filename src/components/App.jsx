import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doneTask: [],
      taskList: [],
      task: ''
    }
    this.postTask = this.postTask.bind(this);
  }
  gettingTask() {
    axios.get('http://localhost:5000/api/getTask')
      .then(response => {
        this.setState({taskList: response.data})
      })
      .catch(err => {
        return err;
      });
  }
  postTask(event) {
    let { task } = this.state;
    axios.post('http://localhost:5000/api/postTask', {task})
      .then(response => {
        this.setState({taskList: response.data, task: ''})
      })
      .catch(err => {
        return err;
      });
  }
  renderTask() {
    return this.state.taskList.map((task, i) => {
      return (
        <li key={i}>{i + 1}. {task}
          <button
            onClick={event => this.completedTask({task})}
            >It's Done!</button>
        </li>
      )
    })
  }
  renderCompletedTask() {
    return this.state.doneTask.map((task, i) => {
      return (
        <li key={i}>{i + 1}. {task}</li>
      )
    })
  }
  getCompletedTask() {
    axios.get('http://localhost:5000/api/getCompletedTask')
      .then(response => {
        this.setState({doneTask: response.data})
      })
      .catch(err => {
        return err;
      });
  }
  completedTask(task) {
    let theList = this.state.taskList;
    for (var i = 0; i < theList.length; i++) {
      if (theList[i] === task.task) {
        theList.splice(i, 1)
      }
    }
    this.setState({taskList: theList});
    axios.put('http://localhost:5000/api/completedTask', {task})
      .then(response => {
        this.setState({doneTask: response.data})
      })
      .catch(err => {
        return err;
      });
  }
  componentWillMount() {
    this.gettingTask()
    this.getCompletedTask()
  }
  render() {
    return(
      <div className="app-main">
        <div className="app-headline">
          <h1>To Do List...</h1>
        </div>
        <div className="app-input">
          <input
            placeholder="Things to do..."
            value={this.state.task}
            onChange={event =>
                this.setState({task: event.target.value})}
            onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.postTask(event)
                }
              }}
          />
          <button
            onClick={event =>
                this.postTask(event)}
          >Submit</button>
        </div>
        <ul className="list-ul">
          <div>
            <div className="unfinished-task">
              <h1>Task to Complete</h1>
              {this.renderTask()}
            </div>
            <div className="completed-task">
              <h1>Completed Task</h1>
              {this.renderCompletedTask()}
            </div>
          </div>
        </ul>
      </div>
    )
  }
}

export default App;

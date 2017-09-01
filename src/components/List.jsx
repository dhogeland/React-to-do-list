import React, { Component } from 'react';
import axios from 'axios';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doneTask: [],
      taskList: this.props.taskList
    }
    this.completedTask = this.completedTask.bind(this);
    this.getCompletedTask = this.getCompletedTask.bind(this);
  }

  renderTask() {
    // console.log('renderTask props', this.props)
    // console.log('renderTask state', this.state)
    // this.setState({taskList: this.props.taskList})
    return this.props.taskList.map((task, i) => {
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
        // console.log(response)
        this.setState({doneTask: response.data, taskList: this.props.taskList})
        // console.log('completedTask gotten', this.state.doneTask)
      })
      .catch(err => {
        return err;
      });
  }

  completedTask(task) {
    // console.log('the task on completion', task)
    let theList = this.state.taskList;
    for (var i = 0; i < theList.length; i++) {
      if (theList[i] === task.task) {
        theList.splice(i, 1)
      }
      // console.log('theList 1', theList)
    }
    // console.log('theList 2', theList)
    this.setState({taskList: theList});
    axios.put('http://localhost:5000/api/completedTask', {task})
      .then(response => {
        // console.log("completedTas response after update", response)
        // console.log('this.props after completedTask', this.props)
        this.setState({doneTask: response.data})
      })

      .catch(err => {
        return err;
      });
  }

  componentDidMount() {
    // console.log('props', this.props)
    this.getCompletedTask();
  }
  componentWillReceiveProps() {
    if (this.props.taskList.length > this.state.taskList.length) {
      console.log("componentWillReceive state", this.state)
      console.log("componentWillReceive props", this.props)
      this.setState({taskList: this.props.taskList})
    }
  }
    render() {
      // console.log(this.props)
      return (
            <div>
              <div className="unfinished-task">
                {this.renderTask()}
              </div>
              <div className="completed-task">
                {this.renderCompletedTask()}
              </div>
            </div>
            )
    }
  }


export default List;

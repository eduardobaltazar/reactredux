import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTasks, completeTask } from './actions';
import TaskList from './taskList';
import Navigation from './nav';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchTasks());
  }

  handleCompleteTask(task) {
    const { dispatch } = this.props;

    dispatch(completeTask(task.id));
  }

  render() {
    const { dispatch, habits, dailies, todos } = this.props;

    return (
      <div className="container">
        <Navigation/>
        <section>
          <h3>Habits</h3>
          <TaskList
            onCompleteTask={(task) => this.handleCompleteTask(task)}
            tasks={habits} type="habit" />
        </section>
        <section>
          <h3>Dailies</h3>
          <TaskList
            onCompleteTask={(task) => this.handleCompleteTask(task)}
            tasks={dailies} type="daily" />
        </section>
        <section>
          <h3>Todos</h3>
          <TaskList
            onCompleteTask={(task) => this.handleCompleteTask(task)}
            tasks={todos} type="todo" />
        </section>
      </div>
    );
  }
}

function select(state) {
  if (state.tasks.length <= 0) {
    return {
      habits: [],
      dailies: [],
      todos: []
    };
  } else {
    //state = Object.assign({}, state, { tasks: state.tasks.data });
    //console.log(state, 'trans');
    return {
      habits: state.tasks.data.filter(task => task.type === 'habit'),
      dailies: state.tasks.data.filter(task => task.type === 'daily'),
      todos: state.tasks.data.filter(task => task.type === 'todo')
    };
  }

}

export default connect(select)(App);
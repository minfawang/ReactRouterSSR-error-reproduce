import { Component } from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';
import TodoHeader from './components/TodoHeader';
import TodosList from './components/TodosList';
import Tasks from 'TodoApp/collections/Tasks';



@ReactMixin.decorate(ReactMeteorData)
export default class TodoMain extends Component {
  state = {
    hideCompleted: false
  }

  getMeteorData() {
    const tasksHandler = Meteor.subscribe('tasks');

    return {
      tasksReady: tasksHandler.ready(),
      tasks: Tasks.find().fetch(),
    };
  }

  render () {
    const { tasks } = this.data;

    return (
      <div className="container">
        <Link to="/admin">Admin</Link>
        <h1>TodoApp/client/TodoMain.jsx</h1>
        <TodoHeader />
        <TodosList {...{tasks}} />
      </div>
    );
  }
}





// import React, { PropTypes } from 'react';
//
// const TodoMain = React.createClass({
//   mixins: [ReactMeteorData],
//   getMeteorData() {
//     return {};
//   },
//
//   render () {
//     return (
//       <div className="container">
//         <Link to="/admin">Admin</Link>
//         <h1>TodoApp/client/TodoMain.jsx</h1>
//       </div>
//     );
//   }
// });
//
// export default TodoMain;

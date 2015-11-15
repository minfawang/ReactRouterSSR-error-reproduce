import { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';

export default class TodosList extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired
  }

  renderTasks() {
    const { tasks } = this.props;
    if (! _.isEmpty(tasks)) {
      return (
        <ul>
          {this.props.tasks.map(task => <TodoItem key={task._id} task={task} />)}
        </ul>
      );
    } else {
      return <h4>No tasks yet.</h4>;
    }
  }

  render() {
    return this.renderTasks();
  }
};

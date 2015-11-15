import { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
  }

  render() {
    return (
      <li>
        {this.props.task.text}
      </li>
    );
  }
};

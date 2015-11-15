import { Component, PropTypes } from 'react';

export default class TodoApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div>
        <h1>TodoApp/client/TodoApp.jsx</h1>
        {this.props.children}
      </div>
    );
  }
}

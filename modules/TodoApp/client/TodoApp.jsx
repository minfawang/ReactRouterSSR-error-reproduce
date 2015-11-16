import { Component, PropTypes } from 'react';

const LoginButtons = BlazeToReact('loginButtons');

export default class TodoApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div>
        <h1>TodoApp/client/TodoApp.jsx</h1>
        <LoginButtons />
        {this.props.children}
      </div>
    );
  }
}

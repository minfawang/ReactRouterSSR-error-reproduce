import { Component } from 'react';

export default class TodoHeader extends Component {

  handleSubmit(e) {
    e.preventDefault();
    let form = e.currentTarget;
    const text = this.refs.input.value.trim();
    if (!! text)
      Meteor.call('/tasks/add', text, err => {
        if (! err)
          form.reset();
        else
          alert(err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input ref="input" name="taskInput" type="text" />
      </form>
    );
  }
};

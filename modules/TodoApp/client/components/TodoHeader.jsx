import { Component } from 'react';

export default class TodoHeader extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const text = this.refs.input.value.trim();
    if (!! text)
      Meteor.call('/tasks/add', text, err => {
        if (! err)
          this.resetForm();
        else
          alert(err);
      });
  }

  resetForm() {
    const form = this.refs.form;
    form.reset();
  }

  render() {
    return (
      <form ref="form" onSubmit={this.handleSubmit.bind(this)}>
        <input ref="input" name="taskInput" type="text" />
      </form>
    );
  }
};

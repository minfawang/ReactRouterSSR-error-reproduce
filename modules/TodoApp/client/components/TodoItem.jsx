import { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
  }

  getClassName() {
    let className = '';
    if (this.props.task.checked) {
      className += ' checked';
    }
    if (this.props.task.isPrivate) {
      className += ' private';
    }
    return className;
  }

  handleTogglePrivate() {
    const { _id, isPrivate } = this.props.task;
    Meteor.call('/task/setPrivate', _id, ! isPrivate);
  }

  handleToggleChecked() {
    const { task } = this.props;
    Meteor.call('/task/setChecked', task._id, ! task.isChecked );
  }

  handleRemove() {
    const { task } = this.props;
    Meteor.call('/tasks/remove', task._id);
  }

  renderTogglePrivateButton() {
    const { task } = this.props;
    if (task.owner === Meteor.userId()) {
      const text = task.isPrivate ? 'Private' : 'Public';
      return <button onClick={this.handleTogglePrivate.bind(this)} className="toggle-private">{text}</button>
    }
  }

  renderToggleCheckedButton() {
    const { task } = this.props;
    return <input onChange={this.handleToggleChecked.bind(this)} type="checkbox" checked={task.isChecked} />
  }

  renderRemoveButton() {
    const { task } = this.props;
    if (task.owner === Meteor.userId()) {
      return <button onClick={this.handleRemove.bind(this)} className="delete">X</button>
    }
  }

  render() {
    const { task } = this.props;

    return (
      <li className={this.getClassName()}>
        {this.renderTogglePrivateButton()}
        {this.renderToggleCheckedButton()}
        <span className="text">{`${task.text}`}</span>
        {this.renderRemoveButton()}
      </li>
    );
  }
};

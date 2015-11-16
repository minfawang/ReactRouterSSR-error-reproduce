import Tasks from 'TodoApp/collections/Tasks';
console.log('Loading todos-method ...');
Meteor.methods({
  '/tasks/add': function (value) {
    check(value, String);
    if (! this.userId)
      throw new Meteor.Error('User not found');

    const task = {
      text: value,
      owner: this.userId,
      createdAt: new Date(),
    };
    Tasks.insert(task);
  },

  '/tasks/remove': function (id) {
    check(id, String);
    if (! this.userId)
      throw new Meteor.Error('User not found');

    Tasks.remove({
      _id: id,
      owner: this.userId
    });
  },

  '/task/setPrivate': function (id, isPrivate) {
    check(id, String);
    check(isPrivate, Boolean);

    Tasks.update(id, {
      $set: { isPrivate }
    });
  },

  '/task/setChecked': function (id, isChecked) {
    check(id, String);
    check(isChecked, Boolean);

    Tasks.update(id, {
      $set: {isChecked}
    });
  }
});

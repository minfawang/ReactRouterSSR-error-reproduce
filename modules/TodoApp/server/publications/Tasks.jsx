import Tasks from 'TodoApp/collections/Tasks';

Meteor.publish('tasks', function () {
  return Tasks.find({});
  // return Tasks.find({
  //   $or: [
  //     { private: {$ne: true} },
  //     { owner: this.userId },
  //   ]
  // });
});

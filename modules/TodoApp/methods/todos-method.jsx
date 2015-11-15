import Tasks from 'TodoApp/collections/Tasks';
console.log('Loading todos-method ...');
Meteor.methods({
  '/tasks/add': function (value) {
    check(value, String);
    const task = {
      text: value
    };
    Tasks.insert(task);
  }
});

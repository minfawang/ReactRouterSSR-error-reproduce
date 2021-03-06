import TestUtils from 'react-addons-test-utils';
import TodoHeader from 'TodoApp/client/components/TodoHeader';

describe('TodoHeader', () => {
  it('should call "/tasks/add" when submitting the form', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call').and.returnValue();

    const root = TestUtils.renderIntoDocument(
      <TodoHeader />
    );

    const formEl = TestUtils.findRenderedDOMComponentWithTag(root, 'form');

    // Add task input
    const task = 'My new Test Task';
    formEl.taskInput.value = task;
    TestUtils.Simulate.submit(formEl, { target: formEl });
    expect(Meteor.call).toHaveBeenCalledWith('/tasks/add', task, jasmine.any(Function));
  });

  it ('should reset the form if the the method "/tasks/add" succeeds', () => {
    const testTask = 'My new task';
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call').and.callFake(function (methodName, task, callback) {
      expect(methodName).toEqual('/tasks/add');
      expect(task).toEqual(testTask);
      callback(null);
    });

    const root = TestUtils.renderIntoDocument(
      <TodoHeader />
    );

    const formEl = TestUtils.findRenderedDOMComponentWithTag(root, 'form');
    formEl.taskInput.value = testTask;
    TestUtils.Simulate.submit(formEl, { target: formEl });
    expect(Meteor.call).toHaveBeenCalled();
    expect(formEl.taskInput.value).toEqual('');
  });


  it ('should send alert and not reset the form if the the method "/tasks/add" fails', () => {
    const testTask = 'My new task';
    const err = 'The method fails';

    spyOn(window, 'alert');
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call').and.callFake(function (methodName, task, callback) {
      expect(methodName).toEqual('/tasks/add');
      expect(task).toEqual(testTask);
      callback(err);
    });

    const root = TestUtils.renderIntoDocument(
      <TodoHeader />
    );

    const formEl = TestUtils.findRenderedDOMComponentWithTag(root, 'form');
    formEl.taskInput.value = testTask;
    TestUtils.Simulate.submit(formEl, { target: formEl });

    expect(Meteor.call).toHaveBeenCalled();
    expect(formEl.taskInput.value).toEqual(testTask);
    expect(window.alert).toHaveBeenCalled();
  });

});

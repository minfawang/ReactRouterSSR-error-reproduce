import TestUtils from 'react-addons-test-utils';
import * as userHelpers from 'TestHelpers/client/user';
import * as domHelpers from 'TestHelpers/client/dom';

describe('Todo', () => {
  beforeEach(done => {
    userHelpers.loginToTestAccount(() => {
      Meteor.call('fixtures/cleanTodo', () => {
        done();
      })
    });
  });

  afterEach(done => {
    Meteor.logout(() => {
      done();
    })
  });

  it('should claim equal', () => {
    expect(1).toEqual(1);
  });

  it('should list tasks by reverse creation order', done => {
    const testText1 = 'My first task';
    const testText2 = 'My second task';

    const formEl = $('form');
    expect(formEl.length).toEqual(1);

    formEl[0].taskInput.value = testText1;
    TestUtils.Simulate.submit(formEl[0], { target: formEl[0] });

    domHelpers.waitsFor('li', 1, taskEl => {
      expect(formEl[0].taskInput.value).toEqual('');
      expect(taskEl.find('.text').text()).toEqual(testText1);

      formEl[0].taskInput.value = testText2;
      TestUtils.Simulate.submit(formEl[0], { target: formEl[0] });

      domHelpers.waitsFor('li', 2, taskEl2 => {
        expect(formEl[0].taskInput.value).toEqual('');
        expect(taskEl2.first().find('.text').text()).toEqual(testText2);
        done();
      });
    });
  });


  it('should remove a task by clicking X', done => {
    const testText = 'my first task';
    const formEl = $('form');
    expect(formEl.length).toEqual(1);

    formEl[0].taskInput.value = testText;
    TestUtils.Simulate.submit(formEl[0], { target: formEl[0] });

    domHelpers.waitsFor('li', 1, taskEl => {
      TestUtils.Simulate.click(taskEl.find('.delete')[0]);
      domHelpers.waitsFor('li', 0, done);
    });
  });

  it('should be able to toggle your task private and public', done => {
    const testText = 'My first task';
    const formEl = $('form');
    expect(formEl.length).toEqual(1);

    formEl[0].taskInput.value = testText;
    TestUtils.Simulate.submit(formEl[0], { target: formEl[0] });
    domHelpers.waitsFor('li', 1, taskEl => {
      const toggleEl = taskEl.find('.toggle-private');
      expect(toggleEl.length).toEqual(1);
      expect(toggleEl.text()).toEqual('Public');

      TestUtils.Simulate.click(toggleEl[0]);
      domHelpers.waitsFor('li button:contains(Private)', 1, () => {
        TestUtils.Simulate.click(toggleEl[0]);
        domHelpers.waitsFor('li button:contains(Public)', 1, done);
      })

    });


  });

});

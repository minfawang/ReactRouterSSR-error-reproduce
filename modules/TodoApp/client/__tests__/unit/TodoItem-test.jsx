import TestUtils from 'react-addons-test-utils';
import TodoItem from 'TodoApp/client/components/TodoItem';

describe('TodoItem', () => {
  it('should display the task text', () => {
    const task = {
      text: 'Test task',
      username: 'Test Name'
    };

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const textEl = TestUtils.findRenderedDOMComponentWithClass(root, 'text');
    expect(textEl.innerText).toContain('Test task');
  });

  it('should cross a checked mark', () => {
    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ checked: true }} />
    );

    expect(ReactDOM.findDOMNode(root).className).toContain('checked');
  });

  it('should not cross a checked mark', () => {
    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ checked: false }} />
    );

    expect(ReactDOM.findDOMNode(root).className).not.toContain('checked');
  });

  it('should highlight a private task', () => {
    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ isPrivate: true }} />
    );

    console.log(root);
    expect(ReactDOM.findDOMNode(root).className).toContain('private');
  });

  it('should hide the private toggle button if not the owner', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ owner: '1234' }} />
    );

    const toggleEl = TestUtils.scryRenderedDOMComponentsWithClass(root, 'toggle-private');
    expect(toggleEl.length).toEqual(0);
  });

  it('should display a "Public" button if is the owner and public', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ owner: '111' }} />
    );

    const toggleEl = TestUtils.findRenderedDOMComponentWithClass(root, 'toggle-private');
    expect(toggleEl.innerText).toBe('Public');
  });

  it('should display a "Private" button if is the owner and private', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ owner: '111', isPrivate: true }} />
    );

    const toggleEl = TestUtils.findRenderedDOMComponentWithClass(root, 'toggle-private');
    expect(toggleEl.innerText).toBe('Private');
  });


  it('should switch to public when clicking private button', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ _id: '222', owner: '111', isPrivate: true }} />
    );

    const toggleEl = TestUtils.findRenderedDOMComponentWithClass(root, 'toggle-private');
    TestUtils.Simulate.click(toggleEl);

    expect(Meteor.call).toHaveBeenCalledWith('/task/setPrivate', '222', false);
  });

  it('should switch to private when clicking public button', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ _id: '222', owner: '111' }} />
    );

    const toggleEl = TestUtils.findRenderedDOMComponentWithClass(root, 'toggle-private');
    TestUtils.Simulate.click(toggleEl);

    expect(Meteor.call).toHaveBeenCalledWith('/task/setPrivate', '222', true);
  });

  it('should be chcked when clicking the checkbox', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ _id: '222', owner: '111' }} />
    );

    const checkboxEl = ReactDOM.findDOMNode(root).querySelector('input[type="checkbox"]');
    TestUtils.Simulate.change(checkboxEl, { target: { checked: true } });

    expect(Meteor.call).toHaveBeenCalledWith('/task/setChecked', '222', true);
  });

  it('should be unchcked when unchecking the checkbox', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ _id: '222', owner: '111', isChecked: true }} />
    );

    const checkboxEl = ReactDOM.findDOMNode(root).querySelector('input[type="checkbox"]');
    TestUtils.Simulate.change(checkboxEl, { target: { checked: true } });

    expect(Meteor.call).toHaveBeenCalledWith('/task/setChecked', '222', false);
  });

});

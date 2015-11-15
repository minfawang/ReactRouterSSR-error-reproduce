export default {
  path: 'admin',
  indexRoute: {
    onEnter: function (nextState, replaceState) {
      // Redirect to dashboard by default
      replaceState(null, '/admin/dashboard');
      console.log('onEnter admin');
    }
  },

  getChildRoutes(location, cb) {
    if (Meteor.isClient) {
      // Split the code on a different file when on a client
      require.ensure([], require => {
        cb(null, require('./routes'));
      }, 'admin');
    } else {
      // Save the chunk for server-rendering
      global.__CHUNK_COLLECTOR__.push('admin');
      cb(null, require('./routes'));
    }
  }
};

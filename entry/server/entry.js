import 'TodoApp/methods';
import 'TodoApp/server/publications';

if (process.env.NODE_ENV === 'production') {
  // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(WebpackStats);

  require('../client/routes');
} else {
  console.dir(WebpackStats);
  // Add fixtures required for integration tests
  const context = require.context('../../modules', true, /\/server\/(.*)\/integration\/(.*)\-fixtures\.jsx?$/);
  context.keys().forEach(context);

  if (process.env.FRAMEWORK === 'jasmine-server-integration') {
    // Run integration tests on server
    const context = require.context('../../modules', true, /\/server\/(.*)\/server\/(.*)\/integration\/(.*)\-test\.jsx?$/);
    context.keys().forEach(context);
  }
}

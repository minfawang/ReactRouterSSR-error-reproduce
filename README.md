# ReactRouterSSR-error-reproduce

This repo is almost identical to [kickstart-hugeapp](https://github.com/thereactivestack/kickstart-hugeapp) with minor differences of styling and naming.

When running the application in production mode (with command `meteor --production`), and go to browser to visit `localhost:3000`. There is the error message printed to the console:

```
W20151116-22:53:33.323(-8)? (STDERR) error while server-rendering TypeError: Cannot call method 'ready' of undefined
W20151116-22:53:33.324(-8)? (STDERR)     at t.i.value (webpack:///Users/voiceup/Desktop/hugeapp/.meteor/local/webpack-npm/~/smart-mixin/index.js:174:1)
W20151116-22:53:33.324(-8)? (STDERR)     at MeteorDataManager.calculateData (meteor-data-mixin.jsx:62:24)
W20151116-22:53:33.324(-8)? (STDERR)     at t.ReactMeteorData.componentWillMount (meteor-data-mixin.jsx:5:45)
W20151116-22:53:33.324(-8)? (STDERR)     at t.<anonymous> (webpack:///Users/voiceup/Desktop/hugeapp/.meteor/local/webpack-npm/~/smart-mixin/index.js:174:1)
W20151116-22:53:33.324(-8)? (STDERR)     at t.<anonymous> (webpack:///Users/voiceup/Desktop/hugeapp/.meteor/local/webpack-npm/~/smart-mixin/index.js:174:1)
W20151116-22:53:33.324(-8)? (STDERR)     at [object Object].ReactCompositeComponentMixin.mountComponent (../../../../../Desktop/hugeapp/react/lib/ReactCompositeComponent:210:1)
W20151116-22:53:33.324(-8)? (STDERR)     at Object.ReactReconciler.mountComponent (../../../../../Desktop/hugeapp/react/lib/ReactReconciler:37:1)
W20151116-22:53:33.324(-8)? (STDERR)     at ReactDOMComponent.ReactMultiChild.Mixin.mountChildren (../../../../../Desktop/hugeapp/react/lib/ReactMultiChild:241:1)
W20151116-22:53:33.325(-8)? (STDERR)     at ReactDOMComponent.Mixin._createContentMarkup (../../../../../Desktop/hugeapp/react/lib/ReactDOMComponent:588:1)
W20151116-22:53:33.325(-8)? (STDERR)     at ReactDOMComponent.Mixin.mountComponent (../../../../../Desktop/hugeapp/react/lib/ReactDOMComponent:478:1)

```

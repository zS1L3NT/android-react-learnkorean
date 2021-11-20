# Connecting to React DevTools
- Make sure default devtools are off. If they're on, 
	- Uninstall the app
	- Stop Metro
	- Close the tab in the browser
	- Reinstall the app

# Connecting to Redux DevTools
- Make sure the store has devToolsEnhancer
```ts
// @ts-ignore
const store = createStore(persistedReducer, devToolsEnhancer({ realtime: true, port: 8000, suppressConnectErrors: false }))
```

- Make sure the redux dev tools is running
```bash
npx remotedev-server --port=8000
```

- Make sure to run the adb command
```bash
adb reverse tcp:8000 tcp:8000
```

## Not working
Read this
https://github.com/zalmoxisus/remote-redux-devtools/issues/48
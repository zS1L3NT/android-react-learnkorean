import App from "./src/App"
import persistStore from "redux-persist/es/persistStore"
import React from "react"
import store from "./src/store"
import theme from "./src/theme"
import { AppRegistry } from "react-native"
import { name as appName } from "./app.json"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
import { ThemeProvider } from "react-native-magnus"

const Index = () => (
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<PersistGate persistor={persistStore(store)}>
				<App />
			</PersistGate>
		</Provider>
	</ThemeProvider>
)

AppRegistry.registerComponent(appName, () => Index)

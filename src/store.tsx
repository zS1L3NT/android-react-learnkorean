import AsyncStorage from "@react-native-async-storage/async-storage"
import devToolsEnhancer from "remote-redux-devtools"
import lessons from "./reducers/LessonsReducer"
import title from "./reducers/TitleReducer"
import { combineReducers, createStore } from "redux"
import { persistReducer } from "redux-persist"

const rootReducer = combineReducers({
	title,
	lessons
})

const persistedReducer = persistReducer(
	{
		key: "root",
		storage: AsyncStorage
	},
	rootReducer
)

const store = createStore(
	persistedReducer,
	// @ts-ignore
	devToolsEnhancer({ realtime: true, port: 8000, suppressConnectErrors: false })
)

export type AppState = ReturnType<typeof rootReducer>
export type iStore = typeof store
export default store

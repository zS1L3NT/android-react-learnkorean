import AsyncStorage from "@react-native-async-storage/async-storage"
import lessons from "./reducers/LessonsReducer"
import { combineReducers, createStore } from "redux"
import { persistReducer } from "redux-persist"
import devToolsEnhancer from "remote-redux-devtools"

const rootReducer = combineReducers({
	lessons
})

const persistedReducer = persistReducer(
	{
		key: "root",
		storage: AsyncStorage
	},
	rootReducer
)

// @ts-ignore
const store = createStore(persistedReducer, devToolsEnhancer({ realtime: true, port: 8000, suppressConnectErrors: false }))

export type AppState = ReturnType<typeof rootReducer>
export type iStore = typeof store
export default store

import AsyncStorage from "@react-native-async-storage/async-storage"
import lessons from "./reducers/LessonsReducer"
import { combineReducers, createStore } from "redux"
import { persistReducer } from "redux-persist"

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

const store = createStore(persistedReducer)

export type AppState = ReturnType<typeof rootReducer>
export type iStore = typeof store
export default store

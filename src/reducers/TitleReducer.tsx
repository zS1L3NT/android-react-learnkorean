import { Reducer } from "redux"
import { iTitleActions, iTitleData } from "../redux"

const initial_state: iTitleData = "Learn Korean"

const reducer: Reducer<iTitleData, iTitleActions> = (
	state = initial_state,
	action: iTitleActions
): iTitleData => {
	switch (action.type) {
		case "SET_TITLE":
			return action.payload.title
		default:
			return state
	}
}

export default reducer

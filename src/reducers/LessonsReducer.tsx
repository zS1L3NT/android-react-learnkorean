import { iLessonsActions, iLessonsData } from "../redux"
import { Reducer } from "redux"

const initial_state: iLessonsData = []

const reducer: Reducer<iLessonsData, iLessonsActions> = (
	state = initial_state,
	action: iLessonsActions
): iLessonsData => {
	switch (action.type) {
		case "SET_LESSONS":
			return action.payload.lessons
		default:
			return state
	}
}

export default reducer

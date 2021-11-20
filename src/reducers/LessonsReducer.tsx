import { iLessonsActions, iLessonsData } from "../redux"
import { Reducer } from "redux"

const initial_state: iLessonsData = Array(5).fill(
	Array(30).fill({
		completed: false,
		qna: {}
	})
)

const reducer: Reducer<iLessonsData, iLessonsActions> = (
	state = initial_state,
	action: iLessonsActions
): iLessonsData => {
	const stateCopy = JSON.parse(JSON.stringify(state)) as iLessonsData

	switch (action.type) {
		case "SET_LESSON_QUIZ_ANSWERS": {
			const { day, month } = action.payload
			stateCopy[month - 1][day - 1].qna = action.payload.qna
			return stateCopy
		}
		case "SET_LESSON_COMPLETED": {
			const { day, month } = action.payload
			stateCopy[month - 1][day - 1].completed = true
			return stateCopy
		}
		case "CLEAR_LESSON_QUIZ_ANSWERS": {
			const { day, month } = action.payload
			stateCopy[month - 1][day - 1].qna = {}
			return stateCopy
		}
		default:
			return state
	}
}

export default reducer

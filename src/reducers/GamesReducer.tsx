import { iGamesActions, iGamesData } from "../redux"
import { Reducer } from "redux"
import { Games as games } from "../data.json"

const initial_state: iGamesData = Object.keys(games).reduce(
	(object, key) => ({
		...object,
		[key]: {
			completed: false,
			highest: null,
			qna: {}
		}
	}),
	{}
)

const reducer: Reducer<iGamesData, iGamesActions> = (
	state = initial_state,
	action: iGamesActions
): iGamesData => {
	const stateCopy = JSON.parse(JSON.stringify(state)) as iGamesData

	switch (action.type) {
		case "SET_GAME_HIGHEST": {
			const { title } = action.payload
			stateCopy[title].highest = action.payload.highest
			return stateCopy
		}
		case "SET_GAME_ANSWERS": {
			const { title } = action.payload
			stateCopy[title].qna = action.payload.qna
			return stateCopy
		}
		case "SET_GAME_COMPLETED": {
			const { title } = action.payload
			stateCopy[title].completed = true
			return stateCopy
		}
		case "CLEAR_GAME_ANSWERS": {
			const { title } = action.payload
			stateCopy[title].qna = {}
			return stateCopy
		}
		default:
			return state
	}
}

export default reducer

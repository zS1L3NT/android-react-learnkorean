import { Reducer } from "redux"
import { iHangulsActions, iHangulsData } from "../redux"

const initial_state: iHangulsData = 1

const reducer: Reducer<iHangulsData, iHangulsActions> = (
	state = initial_state,
	action: iHangulsActions
): iHangulsData => {
	switch (action.type) {
		case "SET_HANGULS":
			return action.payload.hanguls
		default:
			return state
	}
}

export default reducer

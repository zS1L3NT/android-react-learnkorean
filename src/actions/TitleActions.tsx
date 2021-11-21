import { iSetTitle } from "../redux"

export const setTitle = (title: string): iSetTitle => ({
	type: "SET_TITLE",
	payload: {
		title
	}
})

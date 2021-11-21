import { iClearGameAnswers, iSetGameAnswers, iSetGameCompleted, iSetGameHighest } from "../redux"

export const setGameHighest = (title: string, highest: number): iSetGameHighest => ({
	type: "SET_GAME_HIGHEST",
	payload: {
		title,
		highest
	}
})

export const setGameAnswers = (title: string, qna: Record<string, string>): iSetGameAnswers => ({
	type: "SET_GAME_ANSWERS",
	payload: {
		title,
		qna
	}
})

export const setGameCompleted = (title: string): iSetGameCompleted => ({
	type: "SET_GAME_COMPLETED",
	payload: {
		title
	}
})

export const clearGameAnswers = (title: string): iClearGameAnswers => ({
	type: "CLEAR_GAME_ANSWERS",
	payload: {
		title
	}
})

/**
 * Title
 */
export type iTitleData = string

export interface iSetTitle {
	type: "SET_TITLE"
	payload: {
		title: string
	}
}

export type iTitleActions = iSetTitle

/**
 * Lessons
 */
export type iLessonsData = {
	completed: boolean
	highest: number | null
	qna: Record<string, string>
}[][]

export interface iSetLessonQuizHighest {
	type: "SET_LESSON_QUIZ_HIGHEST"
	payload: {
		day: number
		month: number
		highest: number
	}
}

export interface iSetLessonQuizAnswers {
	type: "SET_LESSON_QUIZ_ANSWERS"
	payload: {
		day: number
		month: number
		qna: Record<string, string>
	}
}

export interface iSetLessonCompleted {
	type: "SET_LESSON_COMPLETED"
	payload: {
		day: number
		month: number
	}
}

export interface iClearLessonQuizAnswers {
	type: "CLEAR_LESSON_QUIZ_ANSWERS"
	payload: {
		day: number
		month: number
	}
}

export type iLessonsActions =
	| iSetLessonQuizHighest
	| iSetLessonQuizAnswers
	| iSetLessonCompleted
	| iClearLessonQuizAnswers

/**
 * Games
 */
export type iGamesData = Record<
	string,
	{
		completed: boolean
		highest: number | null
		qna: Record<string, string>
	}
>

export interface iSetGameHighest {
	type: "SET_GAME_HIGHEST"
	payload: {
		title: string
		highest: number
	}
}

export interface iSetGameAnswers {
	type: "SET_GAME_ANSWERS"
	payload: {
		title: string
		qna: Record<string, string>
	}
}

export interface iSetGameCompleted {
	type: "SET_GAME_COMPLETED"
	payload: {
		title: string
	}
}

export interface iClearGameAnswers {
	type: "CLEAR_GAME_ANSWERS"
	payload: {
		title: string
	}
}

export type iGamesActions =
	| iSetGameHighest
	| iSetGameAnswers
	| iSetGameCompleted
	| iClearGameAnswers

/**
 * Hanguls
 */
export type iHangulsData = number

export interface iSetHanguls {
	type: "SET_HANGULS"
	payload: {
		hanguls: number
	}
}

export type iHangulsActions = iSetHanguls
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

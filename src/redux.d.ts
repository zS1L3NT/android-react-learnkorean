/**
 * Lessons
 */
export type iLessonsData = {
	completed: boolean
	page: number
	qna: Record<string, string>
}[][]

export interface iSetLessonPage {
	type: "SET_LESSON_PAGE"
	payload: {
		day: number
		month: number
		page: number
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
	| iSetLessonPage
	| iSetLessonQuizAnswers
	| iSetLessonCompleted
	| iClearLessonQuizAnswers

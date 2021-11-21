import {
	iClearLessonQuizAnswers,
	iSetLessonCompleted,
	iSetLessonQuizAnswers,
	iSetLessonQuizHighest
} from "../redux"

export const setLessonQuizHighest = (
	day: number,
	month: number,
	highest: number
): iSetLessonQuizHighest => ({
	type: "SET_LESSON_QUIZ_HIGHEST",
	payload: {
		day,
		month,
		highest
	}
})

export const setLessonQuizAnswers = (
	day: number,
	month: number,
	qna: Record<string, string>
): iSetLessonQuizAnswers => ({
	type: "SET_LESSON_QUIZ_ANSWERS",
	payload: {
		day,
		month,
		qna
	}
})

export const setLessonCompleted = (day: number, month: number): iSetLessonCompleted => ({
	type: "SET_LESSON_COMPLETED",
	payload: {
		day,
		month
	}
})

export const clearLessonQuizAnswers = (day: number, month: number): iClearLessonQuizAnswers => ({
	type: "CLEAR_LESSON_QUIZ_ANSWERS",
	payload: {
		day,
		month
	}
})

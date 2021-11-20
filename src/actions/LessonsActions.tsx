import {
	iClearLessonQuizAnswers,
	iSetLessonCompleted,
	iSetLessonQuizAnswers
} from "../redux"

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

type iRootDrawerParamList = {
	Lessons: undefined
	"Learning to Read": undefined
	"Memory Games": undefined
}

type iLessonsStackParamList = {
	MonthList: undefined
	DayList: { month: number }
	Lesson: { lesson: iLesson; month: number; day: number }
	LessonQuiz: { lesson: iLesson; month: number; day: number }
}

type iHangulsStackParamList = {
	HangulList: undefined
	Hangul: { hangul: string }
}

type iGamesStackParamList = {
	GameList: undefined
	Game: { game: iGame; title: string }
}

type iLesson = {
	title: string
	pages: string[]
	qna: Record<string, string>
	options: string[]
}

type iGame = {
	qna: Record<string, string>
	options: string[]
}

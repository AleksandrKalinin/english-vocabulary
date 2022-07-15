let selectedBook = {}


let initialState = {
	"totalScore": 0,
	"todayScore": 0,
	"exercisesComplete": 0,
	"testsComplete": 0,
	"wordsTotal": 0,
	"wordsStudied": 0,
	"wordsRemaining": 0,
	"vocabModalOpen": false,
	"selectedVocabWord": null,
	"selectedBook": selectedBook,
	"booksComments": [
		{
			"id": 1,
			"comments": [
				{
					"commentId": 1,
					"date": "Sun, 17 Mar 2019 16:50:49 GMT",
					"author": "John Doe",
					"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				},
				{
					"commentId": 2,
					"date": "Sun, 17 Mar 2019 16:50:49 GMT",
					"author": "Bob Davis",
					"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				}
			]
		},
		{
			"id": 2,
			"comments": [
				{
					"commentId": 11,
					"date": "Sun, 17 Mar 2019 16:50:49 GMT",
					"author": "John Doe",
					"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				},
				{
					"commentId": 12,
					"date": "Sun, 17 Mar 2019 16:50:49 GMT",
					"author": "Bob Davis",
					"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				}
			]
		},
		{
			"id": 40,
			"comments": [
				{
					"commentId": 34,
					"date": "Sun, 17 Mar 2019 16:50:49 GMT",
					"author": "John Doe",
					"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				},
				{
					"commentId": 35,
					"date": "Sun, 17 Mar 2019 16:50:49 GMT",
					"author": "Bob Davis",
					"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				}
			]
		}				
	]		
};



let reducer = (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_TOTAL_SCORE':
			return {
				...state,
				totalScore: action.payload }

		case 'UPDATE_TODAY_SCORE':
			return {
				...state,
				todayScore: action.payload }

		case 'UPDATE_EXERCISES_COMPLETE':
			return {
				...state,
				exercisesComplete: action.payload }

		case 'UPDATE_TESTS_COMPLETE':
			return {
				...state,
				testsComplete: action.payload }

		case 'UPDATE_WORDS_TOTAL':
			return {
				...state,
				wordsTotal: action.payload }

		case 'UPDATE_WORDS_REMAINING':
			return {
				...state,
				wordsRemaining: action.payload }

		case 'UPDATE_WORDS_STUDIED':
			return {
				...state,
				wordsStudied: action.payload }

		case 'CHANGE_COLOR_SCHEME':
			return {
				...state,
				colorScheme: action.payload }

		case 'CHANGE_SOUND_VOLUME':
			return {
				...state,
				soundVolume: action.payload }

		case 'TOGGLE_VOCAB_MODAL':
			return {
				...state,
				vocabModalOpen: action.payload }

		case 'SELECT_VOCAB_WORD':
			return {
				...state,
				selectedVocabWord: action.payload }		

		case 'VOICE_VOCAB_WORD':
			return {
				...state,
				vocabWord: action.payload }

		case 'SELECT_BOOK':
			return {
				...state,
				selectedBook: action.payload }

		case 'SELECT_FONT_FAMILY':
			return {
				...state,
				fontFamily: action.payload }	

		case 'SELECT_FONT_SPACING':
			return {
				...state,
				fontSpacing: action.payload }

		case 'SELECT_FONT_WEIGHT':
			return {
				...state,
				fontWeight: action.payload }

		case 'SELECT_FONT_SIZE':
			return {
				...state,
				fontSize: action.payload }

		case 'SELECT_FONT_COLOR':
			return {
				...state,
				fontColor: action.payload }	

		case 'SELECT_BG_COLOR':
			return {
				...state,
				bgColor: action.payload }

		case 'ADD_COMMENT_TO_BOOK':
			const index = state.booksComments.findIndex(book => book.id == action.payload.id);
			const newComments = [...state.booksComments];
			newComments[index].comments.push(action.payload.comment);
			return {
				...state,
				booksComments: [...newComments] }

		default: return state;		
	}
}

export default reducer;
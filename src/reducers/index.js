let initialState = {
	"totalScore": 0,
	"todayScore": 0,
	"exercisesComplete": 0,
	"testsComplete": 0,
	"wordsTotal": 0,
	"wordsStudied": 0,
	"wordsRemaining": 0,		
};

let reducer = (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_TOTAL_SCORE':
			return {
				...state,
				totalScore: action.payload
			}
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
		default: return state;		
	}
}

export default reducer;
let initialState = {
	"totalScore": 187,
	"exercisesComplete": 22,
	"testsComplete": 2
};



let resultsReducer = (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_TOTAL_SCORE':
			return {
				...state,
				totalScore: action.payload }

		case 'UPDATE_EXERCISES_COMPLETE':
			return {
				...state,
				exercisesComplete: action.payload }

		case 'UPDATE_TESTS_COMPLETE':
			return {
				...state,
				testsComplete: action.payload }

		default: return state;		
	}
}

export default resultsReducer;
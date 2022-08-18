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
				totalScore: state.totalScore + action.payload }

		case 'UPDATE_EXERCISES_COMPLETE':
			console.log(state.exercisesComplete);

			return {
				...state,
				exercisesComplete: ++state.exercisesComplete }

		case 'UPDATE_TESTS_COMPLETE':
			return {
				...state,
				testsComplete: ++state.testsComplete }

		default: return state;		
	}
}

export default resultsReducer;
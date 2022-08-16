let initialState = {
	"tests": [
		{
			"score": 35,
			"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
			"percentage": 82.5
		},
		{
			"score": 38,
			"date": "Sun Jul 20 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
			"percentage": 34.5
		}
	]
};



let testsReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'UPDATE_TESTS':			
			return {
				...state,
				tests: [...state.tests, action.payload] }

		default: return state;		
	}
}

export default testsReducer;
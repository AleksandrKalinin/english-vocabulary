let initialState = {
	"colorScheme": null,
	"soundVolume": null
};



let settingsReducer = (state = initialState, action) => {
	switch(action.type){
		case 'CHANGE_COLOR_SCHEME':
			return {
				...state,
				colorScheme: action.payload }

		case 'CHANGE_SOUND_VOLUME':
			return {
				...state,
				soundVolume: action.payload }

	    default: return state 		
	}
}

export default settingsReducer;
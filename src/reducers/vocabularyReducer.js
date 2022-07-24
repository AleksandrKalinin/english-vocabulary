
let initialState = {
	"vocabModalOpen": false,
	"selectedVocabWord": null,
	"colorScheme": null,
	"soundVolume": null
};



let vocabularyReducer = (state = initialState, action) => {
	switch(action.type){
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

	    default: return state 		
	}
}

export default vocabularyReducer;
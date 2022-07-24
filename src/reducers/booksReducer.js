let selectedBook = {}


let initialState = {
	"selectedBook": selectedBook,
	"booksComments": [
		{
			"id": 1,
			"comments": [
				{
					"commentId": 1,
					"date": "Sun, 17 Mar 2019 16:40:49 GMT",
					"author": "John Doe",
					"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				},
				{
					"commentId": 2,
					"date": "Sun, 17 Mar 2019 16:40:49 GMT",
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
					"date": "Sun, 17 Mar 2019 16:40:49 GMT",
					"author": "John Doe",
					"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				},
				{
					"commentId": 12,
					"date": "Sun, 17 Mar 2019 16:40:49 GMT",
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
					"date": "Sun, 17 Mar 2019 16:40:49 GMT",
					"author": "John Doe",
					"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				},
				{
					"commentId": 35,
					"date": "Sun, 17 Mar 2019 16:40:49 GMT",
					"author": "Bob Davis",
					"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				}
			]
		}				
	],
	color: '#222222',
	backgroundColor: '#f6f6f6',
	fontSize: 16,
	fontFamily: "'Times New Roman', sans-serif",
	lineHeight: 32,
	fontWeight: 400,
	isFontModalOpen: false,
	isColorModalOpen: false,
	isSearchModalOpen: false
};



let booksReducer = (state = initialState, action) => {
	switch(action.type){
		case 'SELECT_BOOK':
			return {
				...state,
				selectedBook: action.payload }

		case 'TOGGLE_FONT_MODAL':
			return {
				...state,
				isFontModalOpen: action.payload }

		case 'TOGGLE_COLOR_MODAL':
			return {
				...state,
				isColorModalOpen: action.payload }

		case 'TOGGLE_SEARCH_MODAL':
			return {
				...state,
				isSearchModalOpen: action.payload }

		case 'SELECT_FONT_FAMILY':
			return {
				...state,
				fontFamily: action.payload }	

		case 'SELECT_FONT_SPACING':
			return {
				...state,
				lineHeight: action.payload }

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
				backgroundColor: action.payload }

	    default: return state 		
	}
}

export default booksReducer;
import {
	FETCH_POSTS_FAILURE,
	FETCH_POSTS_SUCCESS,
	FETCH_TAGS_FAILURE,
	FETCH_TAGS_SUCCESS
} from "../actions/postsActions";

const initialState = {
	posts: [],
	postsError: null,
	tags: [],
	tagsError: null
};

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POSTS_SUCCESS:
			return {...state, posts: action.posts};
		case FETCH_POSTS_FAILURE:
			return {...state, postsError: action.error};
		case FETCH_TAGS_SUCCESS:
			return {...state, tags: action.tags};
		case FETCH_TAGS_FAILURE:
			return {...state, tagsError: action.error};
		default:
			return state;
	}
};

export default postsReducer;
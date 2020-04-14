import {push} from "connected-react-router";
import axiosApi from "../../axiosApi";

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

export const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});
export const fetchPostsFailure = error => ({type: FETCH_POSTS_FAILURE, error});

export const createPostSuccess = () => ({type: CREATE_POST_SUCCESS});
export const createPostFailure = error => ({type: CREATE_POST_FAILURE, error});

export const fetchTagsSuccess = tags => ({type: FETCH_TAGS_SUCCESS,tags});
export const fetchTagsFailure = error => ({type: FETCH_TAGS_FAILURE, error});

export const fetchPosts = () => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/posts');
			dispatch(fetchPostsSuccess(response.data));
		} catch (error) {
			dispatch(fetchPostsFailure(error));
		}
	}
};

export const createPost = postData => {
	return async (dispatch) => {
		try {
			await axiosApi.post('/posts', postData);
			dispatch(createPostSuccess());
			dispatch(push('/'));
		} catch (error) {
			dispatch(createPostFailure(error));
		}
	}
};

export const fetchTags = () => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/posts/tags');
			dispatch(fetchTagsSuccess(response.data));
		} catch (error) {
			dispatch(fetchTagsFailure(error));
		}
	}
};
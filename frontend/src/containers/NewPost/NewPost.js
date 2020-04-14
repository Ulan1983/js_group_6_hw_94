import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {fetchTags, createPost} from "../../store/actions/postsActions";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PostForm from "../../components/UI/Form/PostForm";

class NewPost extends Component {
	componentDidMount() {
		this.props.fetchTags();
	}

	createPost = async (postData) => {
		await this.props.createPost(postData);
	};

	render() {
		return (
			<Fragment>
				<Box pb={2} pt={2}>
					<Typography variant="h4">New post</Typography>
				</Box>
				<PostForm
					onSubmit={this.createPost}
					tags={this.props.tags}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	tags: state.posts.tags
});

const mapDispatchToProps = dispatch => ({
	createPost: postData => dispatch(createPost(postData)),
	fetchTags: () => dispatch(fetchTags()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
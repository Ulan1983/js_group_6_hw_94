import React, {Component} from 'react';
import FormElement from "./FormElement";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class PostForm extends Component {
	state = {
		text: '',
		image: '',
		tags: '[]'
	};

	submitFormHandler = event => {
		event.preventDefault();

		const formData = new FormData();

		Object.keys(this.state).forEach(key => {
			formData.append(key, this.state[key]);
		});
		this.props.onSubmit(formData);
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	fileChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.files[0]
		})
	};

	tagsChangeHandler = (e, tags) => {
		this.setState({tags: JSON.stringify(tags)})
	};

	render() {
		return (
			<form onSubmit={this.submitFormHandler}>
				<Grid container direction="column" spacing={2}>
					<Grid item xs>
						<FormElement
							type="text"
							propertyName="text"
							title="Text"
							placeholder="Enter text"
							onChange={this.inputChangeHandler}
							value={this.state.text}
						/>
					</Grid>
					<Grid item xs>
						<FormElement
							type="file"
							propertyName="image"
							title="Image"
							onChange={this.fileChangeHandler}
						/>
					</Grid>
					<Grid item xs>
						<FormElement
							propertyName="tags"
							title="Tags"
							onChange={this.tagsChangeHandler}
							type="tags"
							tags={this.props.tags}
							value={JSON.parse(this.state.tags)}
						/>
					</Grid>
					<Grid item xs>
						<Button type="submit" color="primary" variant="contained">Save</Button>
					</Grid>
				</Grid>
			</form>
		);
	}
}

export default PostForm;
import React, {Component} from 'react';
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import {editUser} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class EditProfile extends Component {
	state = {
		displayName: '',
		avatar: ''
	};

	componentDidMount() {
		this.setState({
			displayName: this.props.user.displayName
		})
	}

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	fileChangeHandler = event => this.setState({[event.target.name]: event.target.files[0]});

	submitFormHandler = event => {
		event.preventDefault();

		const formData = new FormData();

		Object.keys(this.state).forEach(key => {
			formData.append(key, this.state[key]);
		});
		this.props.editUser(formData);
	};

	getFieldError = fieldName => {
		try {
			return this.props.error.errors[fieldName].message;
		} catch (e) {
			return undefined;
		}
	};

	render() {
		return (
			<>
				<Grid container justify="center">
					<Grid item xs={12} md={10} lg={4}>
						<Box pt={2} pb={2}>
							<Typography variant="h4">Edit profile</Typography>
						</Box>

						<form onSubmit={this.submitFormHandler}>
							<Grid container direction="column" spacing={2}>
								<Grid item xs>
									<FormElement
										required
										propertyName="displayName"
										title="DisplayName"
										type="text"
										value={this.state.displayName}
										onChange={this.inputChangeHandler}
										error={this.getFieldError('displayName')}
										placeholder="Change displayName"
										autoComplete="new-displayName"
									/>
								</Grid>
								<Grid item xs>
									<FormElement
										propertyName="avatar"
										title="Avatar"
										type="file"
										onChange={this.fileChangeHandler}
									/>
								</Grid>
								<Grid item xs>
									<Button type="submit" color="primary" variant="contained">
										Edit
									</Button>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</Grid>
			</>
		);
	}
}

const mapStateToProps = state => ({
	error: state.users.registerError,
	user: state.users.user
});

const mapDispatchToProps = dispatch => ({
	editUser: userData => dispatch(editUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
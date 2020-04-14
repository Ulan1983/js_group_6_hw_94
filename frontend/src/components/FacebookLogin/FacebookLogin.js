import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store/actions/usersActions";
import Button from "@material-ui/core/Button";

const FacebookLogin = () => {
	const dispatch = useDispatch();

	const callback = (facebookData) => {
		if (facebookData.id) {
			dispatch(loginWithFacebook(facebookData));
		}
	};

	return (
		<FacebookLoginButton
			appId="3183406108338565"
			callback={callback}
			fields="name, email, picture"
			render={renderProps => (
				<Button
					color='primary'
					onClick={renderProps.onClick}
				>
					Login with Facebook
				</Button>
			)}
		/>
	);
};

export default FacebookLogin;
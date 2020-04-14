import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../../store/actions/usersActions";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import UserMenu from "./UserMenu";

const useStyles = makeStyles(theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	title: {
		flexGrow: 1,
	},
	mainLink: {
		color: 'inherit',
		textDecoration: 'none',
		'&:hover': {
			color: 'inherit'
		}
	}
}));


const AppToolbar = () => {
	const user = useSelector(state => state.users.user);
	const dispatch = useDispatch();

	const classes = useStyles();

	return (
		<>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<Link to="/" className={classes.mainLink}>Social App</Link>
					</Typography>

					{user ? (
						<UserMenu user={user} logout={() => dispatch(logoutUser())}/>
					) : null}
				</Toolbar>
			</AppBar>
			<Toolbar/>
		</>
	);
};

export default AppToolbar;
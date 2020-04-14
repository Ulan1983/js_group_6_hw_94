import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import Avatar from "@material-ui/core/Avatar";
import {apiURL} from "../../../constants";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FormElement from "../Form/FormElement";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {subscribeUser} from "../../../store/actions/usersActions";


const UserMenu = ({user, logout}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const [inputName, setInputName] = useState({searchField: ''});

	const dispatch = useDispatch();

	const userAva = useSelector(state => state.users.user.avatar);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const modalOpen = () => {
		setOpen(true);
	};

	const modalClose = () => {
		setOpen(false);
	};

	const useStyles = makeStyles((theme) => ({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	}));

	const classes = useStyles();
	return (
		<>
			<Button type-="submit" color="inherit" variant="outlined" onClick={modalOpen}>Subscribe</Button>
			<IconButton color="inherit" onClick={handleClick}>
				{user.facebookId ? (
					<Avatar src='https://scontent.ffru7-1.fna.fbcdn.net/v/t31.0-1/cp0/c15.0.50.50a/p50x50/10733713_10150004552801937_4553731092814901385_o.jpg?_nc_cat=1&_nc_sid=12b3be&_nc_oc=AQkWoWw4ZmpMfrjTB-ps4CTR4wYbR4Pw-KbZPteRxZ1gV-CATTQcYbYHbOSHCfH7x5w&_nc_ht=scontent.ffru7-1.fna&oh=14be0d8a9960695a8b991cb764c7469b&oe=5EB6CD2C
'/>
				) : <Avatar src={apiURL + '/uploads/' + userAva}/>
				}
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<ListItem disabled>Hello, {user.displayName}!</ListItem>
				<Divider/>
				<MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
				<MenuItem onClick={handleClose} component={Link} to="/add">Add post</MenuItem>
				<MenuItem onClick={logout}>Logout</MenuItem>
			</Menu>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={modalClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Grid container justify="center">
							<FormElement
								required
								propertyName="searchUserField"
								title="Search User"
								type="text"
								value={inputName.searchField}
								onChange={e => setInputName({searchField: e.target.value})}
								placeholder="Enter displayName"
								autoComplete="new-searchUser"
							/>
							<Box pt={2}>
								<Button
									type="submit"
									color="primary"
									variant="contained"
									onClick={e => {
										e.preventDefault();
										dispatch(subscribeUser(inputName.searchField));
										modalClose();
									}}>
									Subscribe
								</Button>
							</Box>
						</Grid>
					</div>
				</Fade>
			</Modal>
		</>
	);
};

export default UserMenu;
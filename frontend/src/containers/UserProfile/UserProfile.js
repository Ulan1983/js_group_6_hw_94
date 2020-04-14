import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiURL} from "../../constants";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";


class UserProfile extends Component {
	render() {
		return (
			<>
				{this.props.user &&
				<Grid container direction="column" justify="center" alignItems="center">
					<Grid item xs>
						<Box pt={2} pb={2}>
							<Typography variant="h4">View profile</Typography>
						</Box>
					</Grid>
					<Grid item xs>
						<Box pt={2} pb={2}>
							<Typography variant="h5">Username: {this.props.user.username}</Typography>
						</Box>
					</Grid>
					<Grid item xs>
						<Box pt={2} pb={2}>
							<Typography variant="h5">Displayname: {this.props.user.displayName}</Typography>
						</Box>
					</Grid>
					<Grid item xs>
						<Box pt={2} pb={2}>
							<Typography variant="h5">Current avatar:
								{this.props.user.facebookId ?
									<img style={{maxWidth: '50px', marginLeft: '10px'}} alt="" src='https://scontent.ffru7-1.fna.fbcdn.net/v/t31.0-1/cp0/c15.0.50.50a/p50x50/10733713_10150004552801937_4553731092814901385_o.jpg?_nc_cat=1&_nc_sid=12b3be&_nc_oc=AQkWoWw4ZmpMfrjTB-ps4CTR4wYbR4Pw-KbZPteRxZ1gV-CATTQcYbYHbOSHCfH7x5w&_nc_ht=scontent.ffru7-1.fna&oh=14be0d8a9960695a8b991cb764c7469b&oe=5EB6CD2C
									'/> : <img style={{maxWidth: '50px', marginLeft: '10px'}} src={apiURL + '/uploads/' + this.props.user.avatar}
											   alt=""/>
								}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs>
						<Button variant="contained" color="primary" component={Link} to="/profile/edit">Edit profile</Button>
					</Grid>
				</Grid>
				}
			</>
		);
	}
}

const mapStateToProps = state => ({
	user: state.users.user
});


export default connect(mapStateToProps)(UserProfile);
const express = require('express');
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const {nanoid} = require('nanoid');

const User = require('../models/User');
const config = require('../config');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, nanoid() + path.extname(file.originalname));
	}
});

const upload = multer({storage});

const router = express.Router();

router.post('/', upload.single('avatar'), async (req, res) => {
	try {
		if (!req.body.avatar) {
			req.body.avatar = 'user.png';
		}

		const user = new User({
			username: req.body.username,
			password: req.body.password,
			displayName: req.body.displayName,
			avatar: req.body.avatar
		});

		if (!user) {
			return res.status(400).send({message: 'This user is already registered!'});
		}

		user.generateToken();
		await user.save();

		return res.send(user);
	} catch(error){
		res.status(400).send(error)
	}
});

router.post('/sessions', async (req, res) => {
	const user = await User.findOne({username: req.body.username});

	if (!user) {
		return res.status(400).send({error: 'Username or password not correct!'});
	}

	const isMatch = await bcrypt.compare(req.body.password, user.password);

	if (!isMatch) {
		return res.status(400).send({error: 'Username or password not correct!'});
	}

	user.generateToken();
	await user.save();

	return res.send(user);
});

router.delete('/sessions', async (req, res) => {
	const success = {message: 'Success'};

	try {
		const token = req.get('Authorization').split(' ')[1];

		if (!token) return res.send(success);

		const user = await User.findOne({token});

		if (!user) return res.send(success);

		user.generateToken();
		await user.save();

		return res.send(success);
	} catch (e) {
		return res.send(success);
	}
});

router.put('/', auth, upload.single('avatar'), async (req, res) => {

	const userData = req.body;

	const user = await User.findOne({_id: req.user._id});

	if (req.file) {
		user.avatar = req.file.filename;
	}

	if (userData.displayName) {
		user.displayName = userData.displayName
	}

	try {
		await user.save();
		return res.send(user);
	} catch (e) {
		return res.status(400).send(e);
	}
});

router.post('/facebook', async (req, res) => {
	try {
		const inputToken = req.body.accessToken;
		const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

		const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

		const response = await axios.get(url);

		if (response.data.data.error) {
			return res.status(401).send({message: 'Facebook token incorrect'});
		}

		if (req.body.id !== response.data.data.user_id) {
			return res.status(401).send({message: 'User ID incorrect'});
		}

		let user = await User.findOne({facebookId: req.body.id});

		if (!user) {
			user = new User({
				username: req.body.name || req.body.email,
				password: nanoid(),
				facebookId: req.body.id,
				displayName: req.body.name,
				avatar: req.body.picture.data.url
			});
		}

		user.generateToken();
		await user.save();

		return res.send(user);
	} catch (e) {
		return res.status(401).send('Unauthorized user!');
	}
});

router.post('/subscribe', auth, async (req, res) => {
	const user = req.user;

	try {
		const subscribedUser = await User.findOne({displayName: req.body.displayName});

		if (!subscribedUser) {
			return res.status(404).send({message: "Not found!"});
		}

		user.subscriptions.forEach(key => {
			if (subscribedUser[key]._id === req.user._id) {
				user.subscriptions.push(subscribedUser);
			}
		});

		return res.send(user);
	} catch (error) {
		return res.status(400).send(error);
	}
});

module.exports = router;
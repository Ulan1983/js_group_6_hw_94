const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const config = require('../config');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.uploadPath)
	},
	filename: (req, file, cb) => {
		cb(null, nanoid() + path.extname(file.originalname))
	}
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const posts = await Post.find().populate('user');

		if (!posts) {
			return res.status(404).send({message: "Not found!"});
		}
		return res.send(posts);
	} catch (error) {
		return res.status(404).send({message: "Not found!", error});
	}
});

router.get('/tags', async (req, res) => {
	try {
		const tags = await Post.distinct('tags');

		return res.send(tags);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.post('/', auth, upload.single('image'), async (req, res) => {
	try {
		const postData = {
			user: req.user._id,
			text: req.body.text,
			tags: JSON.parse(req.body.tags),
		};

		if (req.file) {
			postData.image = req.file.filename;
		}

		const post = new Post(postData);

		await post.save();

		return res.send(post);
	} catch (error) {
		return res.status(500).send(error);
	}
});


module.exports = router;
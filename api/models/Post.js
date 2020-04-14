const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectID,
		ref: 'User',
		required: true
	},
	text: {
		type: String,
		required: function () {
			return !this.image
		}
	},
	image: {
		type: String,
		required: function () {
			return !this.text
		}
	},
	datetime: {
		type: Date,
		default: Date.now
	},
	tags: [String]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
const path = require('path');

const rootPath = __dirname;

module.exports = {
	rootPath,
	uploadPath: path.join(rootPath, 'public', 'uploads'),
	database: 'mongodb://localhost/social-app',
	databaseOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	facebook: {
		appId: '3183406108338565',
		appSecret: '3b381acabccaaa2761b3904833b432af'
	}
};
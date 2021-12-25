const helper = require('./helper');
const env = require('./env');

env.user1 = {
	email: "user1@test.com",
	password: "llysc90-",
	username: "kys",
	userId: "61c5edd5333683fbb5f3358a",
};

env.user2 = {
	email: "user2@test.com",
	password: "llysc90-",
	username: "user2",
	userId: "61c5edd5333683fbb5f3358e",
};

env.qian = {
	email: "qian@gmail.com",
	password: "llysc90-",
};

const authenticate = async () => {
	var resData = await helper.createUser(env.user1);
	console.log(resData);
	env.user1._id = resData.data.createUser._id;
	console.log(await helper.createUser(env.user1));
	resData = await helper.createUser(env.user2);
	console.log(resData);
	console.log(await helper.createUser(env.qian));
	env.user2._id = resData.data.createUser._id;
	console.log(await helper.login(env.user1));
};

module.exports = authenticate;

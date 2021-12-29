const helper = require('./helper');

const createNUsers = async (n) => {
	let users = [];
	for (let i = 0; i < n; i++) {
		users.push(helper.createUser({
			email: `user${i + 3}@test.com`,
			password: "test",
			username: `user${i + 3}`,
		}));
	}
	return Promise.all(users);
}

const createPoint = async (value) => {
	try {
		const requestBody = `
		mutation {
  			createPoint(value: ${value}) {
				createdAt
				value
				user {
					email
					points {
						value
					}
				}
			}
		}
		`;
		return await helper.queryAPI(requestBody);
	} catch (err) {
		throw err;
	}
};

const leaderboard = async () => {
	console.log("creating 35 users")
	const users = await createNUsers(35);
	console.log("users: ", users);
	const results = Promise.all[users.map((user, i) => {
		const logAndPoint = async () => {
			console.log(`login user${i+3}`, await helper.login({ email: `user${i + 3}@test.com`, password: "test" }))
			console.log("creating point", await createPoint(i + 1));
		}
		return logAndPoint();
	})]
	console.log("results", await results);
};

module.exports = leaderboard;

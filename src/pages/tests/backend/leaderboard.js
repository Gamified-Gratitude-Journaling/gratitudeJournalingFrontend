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

const getLeaderboardStatus = async () => {
	try {
		const requestBody = `
		query {
  			leaderboardStatus {
				user {
					email
					username
					entries{
						words
						createdAt
					}
				}
				points
			}
		}
		`;
		return await helper.queryAPI(requestBody);
	} catch (err) {
		throw err;
	}
}

const leaderboardTest = async () => {
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

const maxConsecutiveMissed = (user) => {
	const entries = user.entries;
	let res=0,currNum=(new Date()).setHours(0,0,0,0);
	const ONE_DAY = 1000 * 60 * 60 * 24;
	entries.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
	entries.forEach(({words, createdAt}) => {
		const currDate = (new Date(createdAt)).setHours(0,0,0,0);
		console.log(currNum,currDate, (currNum-currDate)/ONE_DAY);
		res=Math.max(res,(currNum-currDate)/ONE_DAY-1);
		currNum = currDate;
	});
	return res;
}

const leaderboard = async () => {
	const leaderboardStatus = (await getLeaderboardStatus()).data.leaderboardStatus;
	console.log(leaderboardStatus);
	leaderboardStatus.forEach(({user}) => {
		const missed=maxConsecutiveMissed(user);
		if (missed>1)console.log(missed, user);
	})
}

module.exports = leaderboard;

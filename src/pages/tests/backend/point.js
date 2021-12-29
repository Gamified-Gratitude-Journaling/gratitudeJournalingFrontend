const helper = require('./helper');
const env = require('./env');

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

const fetchPoints = async () => {
	const requestBody = `query {
		points {
			_id
			value
			user {
				email
				points {
					value
				}
			}
		}
	}`;
	try {
		return await helper.queryAPI(requestBody);
	} catch (err) {
		throw err;
	}
};

const points = async () => {
	try {
		console.log("login user1", await helper.login(env.user1));
		let createdPoints = [];
		for (var i = 0; i < 5; i++) {
			createdPoints.push(createPoint(5));
		}
		console.log("createdPoints", await Promise.all(createdPoints));
		console.log("login user2", await helper.login(env.user2));
		createdPoints = [];
		for (var i = 0; i < 5; i++) {
			createdPoints.push(createPoint(i));
		}
		console.log("createdPoints", await Promise.all(createdPoints));
		console.log("fetchedPoints", (await fetchPoints()));
	} catch (err) {
		throw err;
	}
};

module.exports = points;
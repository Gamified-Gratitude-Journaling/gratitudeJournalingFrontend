const { convertToRaw, ContentState } = require('draft-js');
const helper = require('./helper');
const env = require('./env');

const modifyFollow = async (followee, type) => {
	try {
		const variables= {
			content: followee,
		}
		const queryBody =
			`mutation FollowEntryUpload ($content: String!) {
			toggleFollow (followee: $content) {
				_id
				followers{
					email
				}
				following {
					email
				}
			}
		}`;
		return await helper.queryAPI(queryBody, variables);
	} catch (err) {
		throw (err);
	}
};

const social = async () => {
	try {
		/*console.log("login user2", await helper.login(env.user2));
		console.log("user2 unfollows user1", await modifyFollow(env.user1.userId, "delete"));
		console.log("user2 follows user1", await modifyFollow(env.user1.userId, "create"));
		console.log("user2 unfollows user1", await modifyFollow(env.user1.userId, "delete"));*/
		console.log("login user1", await helper.login(env.user1));
		console.log("user1 unfollows user2", await modifyFollow(env.user2.username, "delete"));
		const created = await modifyFollow(env.user2.username, "create");
		console.log("user1 follows user2", created);
		console.log("created", created.data);
		//console.log("user1 unfollows user2", await modifyFollow(env.user2.userId, "delete"));
	} catch (err) { throw err; }
};

module.exports = social;
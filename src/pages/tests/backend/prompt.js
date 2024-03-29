const helper = require('./helper');
const env = require('./env');

const createPrompt = async (content) => {
	try {
		const requestBody = `
		mutation {
  			createPrompt(content: "${content}") {
    			content
  			  	_id
				createdAt
				likes
				user {
					email
				}
			}
		}
		`;
		return await helper.queryAPI(requestBody);
	} catch (err) {
		throw err;
	}
};

const fetchPrompt = async () => {
	const requestBody = `query {
		prompt {
			liked
			prompt{
				_id
			}
		}
	}`;
	try {
		return await helper.queryAPI(requestBody);
	} catch (err) {
		throw err;
	}
};

const likePrompt = async (prompt) => {
	const requestBody = `mutation {
		likePrompt(prompt: "${prompt._id}") {
			content
		}
	}`;
	try {
		return await helper.queryAPI(requestBody);
	} catch (err) {
		throw err;
	}
};

const prompts = async () => {
	try {
		console.log("login user1", await helper.login(env.user1));
		let createdPrompts = [];
		const possiblePrompts = ["Write 3 things that made life easier for you today", "Write down one good thing that happened to you today", "What is something nice another person did for you today or this week?"];
		for (var i = 0; i < 3; i++) {
			createdPrompts.push(createPrompt(`${possiblePrompts[i]}`));
		}
		console.log("createdPrompts", await Promise.all(createdPrompts));
		let fetchedPrompts = [], likedPrompt = (await fetchPrompt()).data.prompt.prompt;
		console.log("fail like prompt", await likePrompt(likedPrompt));
		console.log("login user2", await helper.login(env.user2));
		console.log("like prompt success", await likePrompt(likedPrompt));
		console.log("fail like prompt again", await likePrompt(likedPrompt));
		for (var i = 0; i < 100; i++) {
			fetchedPrompts.push(fetchPrompt());
		}
		console.log("fetchedPrompts", (await Promise.all(fetchedPrompts)).map(e => e.data.prompt.prompt));
	} catch (err) {
		throw err;
	}
};

module.exports = prompts;
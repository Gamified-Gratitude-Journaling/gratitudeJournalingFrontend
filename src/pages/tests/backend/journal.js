const { convertToRaw, ContentState } = require('draft-js');
const helper = require('./helper');
const env = require('./env');

const genRandFromArr = (items) => {
	return items[Math.floor(Math.random() * items.length)];
};

const generateRandomJournal = () => {
	return "Test Sample Journal";
};

const generateRandomJournals = async (count) => {
	try {
		var result = [];
		for (var i = 0; i < count; i++) {
			result.push(await createJournal(generateRandomJournal()));
		}
		return result;
	} catch (err) {
		throw err;
	}
};

const customStringify = (journal) => {
	var res = "";
	for (const [key, value] of Object.entries(journal)) {
		res += `${key}: ${isNaN(value) ? `"${value}"` : value} `;
	}
	return res;
};

const createJournal = async (text) => {
	const content = JSON.stringify(convertToRaw(ContentState.createFromText(text)));
	try {
		const variables= {
			content: content,
		}
		const queryBody =
			`mutation JournalEntryUpload ($content: String!) {
			journalEntryUpload (content: $content) {
				_id
				content
				user {
					email
				}
			}
		}`;
		return await helper.queryAPI(queryBody, variables);
	} catch (err) {
		throw (err);
	}
};

const fetchJournals = helper.fetchJournals;

const journals = async (numJournals) => {
	try {
		if (!numJournals) numJournals = 5;
		console.log("user1 generating journal", await generateRandomJournals(numJournals));
		console.log("fetching journal", await fetchJournals());
		await helper.login(env.user2);
		console.log("user2 generating journal", await generateRandomJournals(2));
		console.log("user2 fetching", await fetchJournals());
		await helper.login(env.user1);
		console.log("user1 fetching", await fetchJournals());
		console.log("rewriting Journal", await createJournal("Override"));
		console.log("refetching", await fetchJournals());
	} catch (err) { throw err; }
};

module.exports = journals;
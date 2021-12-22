const helper = require('./helper');
const env = require('./env');

const genRandFromArr = (items) => {
	return items[Math.floor(Math.random()*items.length)];
};

const generateRandomJournal = () => {
	return {
		content: "Sample Journal Entry",
	};
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

const createJournal = async (journal) => {
	try {
		const queryBody =
			`mutation {
			journalEntryUpload (content: "${journal.content}") {
				_id
				content
				user {
					email
				}
			}
		}`;
		//console.log(queryBody);
		return await helper.queryAPI(queryBody);
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
		console.log("rewriting Journal", await createJournal({content: "Override Success"}));
		console.log("refetching", await fetchJournals());
	} catch (err) { throw err; }
};

module.exports = journals;
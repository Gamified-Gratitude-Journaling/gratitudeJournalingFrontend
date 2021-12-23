
//const reset = require('./resetDatabase');
const authenticate = require('./auth');
const journal = require('./journal');
const prompt = require('./prompt');
const env = require('./env');

env.clientEmail = "test@test.com";
env.clientPassword = "llysc90-";

class Test {
	constructor(name, exec) {
		this.name = name;
		this.exec = exec;
	}
}

const tests = [
	new Test('Authentication', authenticate),
	new Test('Journals', journal),
	new Test('Prompts', prompt),
	//new Test('Referrals', referrals),
];

const main = async () => {
	try {
		console.log('Running tests...');
		for (const test of tests) {
			if (!test) continue;
			console.log(`---Testing '${test.name}'---`);
			await test.exec();
		};
	} catch (err) {
		throw err;
	}
};

module.exports = () => main().then(() => {
	console.log("Success!");
}).catch(err => {
	console.log(`!--Failed--!`);
	console.log(err);
});

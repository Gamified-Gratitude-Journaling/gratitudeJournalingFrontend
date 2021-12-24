const reset = require('./resetDatabase');
const test = require('./test');

const main = async () => {
	try {
		await reset();
		await test();
	} catch (err) {
		throw err;
	}
};

main();

module.exports = () => main().then(() => {
	console.log("Success!");
}).catch(err => {
	console.log(`!--Failed--!`);
	console.log(err);
});

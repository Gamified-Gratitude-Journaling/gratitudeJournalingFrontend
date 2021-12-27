import Calendar from "./Calendar";

export default function JournalCalendar ({ entries, rows, cols }) {
	if (!entries) return <></>
	let elements = {}, today = (new Date()).setHours(0, 0, 0, 0);
	const ONE_DAY = 1000 * 60 * 60 * 24;
	for (let i = 0; i < rows * cols; i++) {
		elements[today.toString()] = 0;
		today -= ONE_DAY;
	}
	entries.forEach((e) => {
		const date = (new Date(e.createdAt).setHours(0, 0, 0, 0));
		elements[`${date}`] = e.words;
	});
	return <Calendar
		elements={
			Object.entries(elements).map(([key, val]) => {
				return [`<p>${new Date(parseInt(key)).toLocaleDateString()}</p><p>Words: ${val}</p>`, Math.floor((val+9)/10)*20];
			})
		}
		rows={rows}
		cols={cols}
	/>
}

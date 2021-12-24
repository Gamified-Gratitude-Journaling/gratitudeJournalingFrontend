import ReactToolTip from 'react-tooltip';

const Calendar = ({ entries, rows, cols }) => {
	let elements = {}, today = (new Date()).setHours(0, 0, 0, 0);
	const ONE_DAY = 1000 * 60 * 60 * 24;
	for (let i = 0; i < rows * cols; i++) {
		elements[today.toString()] = 0;
		today -= ONE_DAY;
	}
	entries.forEach((e) => {
		const date = (new Date(e.createdAt).setHours(0, 0, 0, 0));
		elements[`${date}`] += e.value;
	});
	//test elements = {a: 0, b: 10, c: 20, d: 30, e: 40, f: 50, g: 60};
	return (<div className={`grid rounded content-around grid-cols-${cols} grid-rows-${rows}`}>
		{Object.entries(elements).map(([key, val]) => {
			console.log(new Date(parseInt(key)), val);
			return (
				<div className="bg-gray-200 rounded place-self-center h-4 w-4 mt-2"
					data-tip={`<p>${new Date(parseInt(key)).toLocaleDateString()}</p><p>Points: ${val}</p>`}
					data-html={true}
				>
					<div
						className={`rounded place-self-center bg-cyan-500 bg-opacity-${Math.floor(val / 5) * 10} h-4 w-4`}
					>
						<p>&nbsp;</p>
					</div>
				</div>)
		})}
		<ReactToolTip />
	</div>)
}

export default Calendar;
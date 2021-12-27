import ReactToolTip from 'react-tooltip';

export default function Calendar({ elements, rows, cols }) {
	//test elements = {a: 0, b: 10, c: 20, d: 30, e: 40, f: 50, g: 60};
	return (<div className={`grid rounded content-around grid-cols-${cols} grid-rows-${rows}`}>
		{elements.map(([dataTip, val]) => {
			return (
				<div key={dataTip} className="bg-gray-200 rounded place-self-center h-4 w-4 mt-2"
					data-tip={dataTip}
					data-html={true}
				>
					<div
						className={`rounded place-self-center bg-yellow-300 bg-opacity-${val} h-4 w-4`}
					>
						<p>&nbsp;</p>
					</div>
				</div>)
		})}
		<ReactToolTip />
	</div>)
}

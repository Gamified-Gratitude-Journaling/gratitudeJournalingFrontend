import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Calendar = ({entries}) => {
	console.log(entries)
	return <div>
		<CalendarHeatmap 
			startDate={new Date().setFullYear(new Date().getFullYear()-1)}
			endDate={new Date()}
			values={entries.map(entry => {
				return {date: entry.createdAt, count: 5}
			})}
		/>
	</div>
}

export default Calendar;
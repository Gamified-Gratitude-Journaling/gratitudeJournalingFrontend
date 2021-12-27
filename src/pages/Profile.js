import { useApolloClient, gql, useQuery, } from '@apollo/client';
import PointCalendar from '../components/PointCalendar';

import Spinner from '../components/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import BadgesDisplay from '../components/BadgesDisplay';
import JournalCalendar from '../components/JournalCalendar';

const POINTS_QUERY = gql`
  query Points($username: String!){
	  	fetchUser(username: $username){
			points {
				createdAt
				value
			}
			entries{
				_id
				createdAt
			}
			createdPrompts{
				_id
				likes
			}
		}
  }
`;

export default function Profile() {
	const apolloClient = useApolloClient();
	apolloClient.resetStore();
	let { username } = useParams();
	const { loading: ploading, error: perror, data: pdata } = useQuery(POINTS_QUERY, { variables: { username } });
	if (perror) {
		return <p>User not found</p>
	}
	const token = sessionStorage.getItem("token");
	console.log(pdata);

	let totalPoints = 0, totalLikes = 0, totalWords = 0, longestStreak = 0, currentStreak = 0;
	if (pdata) {
		pdata.fetchUser.points.forEach(e => {
			totalPoints += e.value;
		});
		pdata.fetchUser.createdPrompts.forEach(({ likes }) => { totalLikes += likes; })
		pdata.fetchUser.entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
		let prevDate = 0, today = (new Date()).setHours(0, 0, 0, 0), currStreakNot0 = false;
		pdata.fetchUser.entries.forEach((e) => {
			const currDate = (new Date(e.createdAt)).setHours(0, 0, 0, 0);
			const ONE_DAY = 1000 * 60 * 60 * 24;
			if (currDate > prevDate + ONE_DAY) {
				currentStreak = 0;
			}
			currentStreak++;
			longestStreak = Math.max(longestStreak, currentStreak);
			currStreakNot0 = currDate === today;
		});
		if (!currStreakNot0) currentStreak = 0;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2">
			{token && (<div className='sm:col-span-2'>
				<h2 className='pl-4 mb-2'>Surveys</h2>
				<div className='grid grid-cols-3 rounded bg-white pb-2 place-content-evenly'>
					<div className='place-self-center'>
						<h2>To be completed:</h2>
					</div>
				</div>
			</div>)}
			<div className='my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2 text-center'>Point History</h2>
				<div className='rounded bg-white pb-2'>
					{ploading ? <Spinner /> : <PointCalendar
						entries={pdata.fetchUser.points}
						rows={4}
						cols={7}
					/>}
				</div>
			</div>
			<div className='my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2 text-center'>Journal History</h2>
				<div className='rounded bg-white pb-2'>
					{ploading ? <Spinner /> : <JournalCalendar
						entries={pdata.fetchUser.entries}
						rows={4}
						cols={7}
					/>}
				</div>
			</div>
			<div className='sm:col-span-2 my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2'>Badges</h2>
				<div className='rounded bg-white pb-2'>
					{ploading ? <Spinner /> : <BadgesDisplay
						totalPoints={totalPoints}
						entries={pdata.fetchUser.entries}
						likes={totalLikes}
						totalWords={totalWords}
						longestStreak={longestStreak}
						currentStreak={currentStreak}
					/>}
				</div>
			</div>
			<div className='sm:col-span-2 my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2'>Created Prompts</h2>
				<div className='grid grid-cols-3 rounded bg-white pb-2'>
				</div>
			</div>
			<div className='sm:col-span-2 my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2'>Stats</h2>
				<div className='grid grid-cols-3 rounded bg-white pb-2'>
					<p>Total Points: {totalPoints}</p>
				</div>
			</div>
		</div>
	);
}
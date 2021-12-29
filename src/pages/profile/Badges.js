import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import BadgesDisplay from '../../components/BadgesDisplay';
import Spinner from '../../components/Spinner/Spinner';

const FETCH_USER_QUERY = gql`
  query FetchUser($username: String!){
	  	fetchUser(username: $username){
			_id
			points {
				createdAt
				value
			}
			entries{
				_id
				createdAt
				words
			}
			createdPrompts{
				_id
				likes
			}
		}
  }
`;

export default function Badges() {
	const {username} = useParams();
	const { loading, error, data, refetch} = useQuery(FETCH_USER_QUERY, { variables: { username } });
	useEffect(refetch);

	let totalPoints = 0, totalLikes = 0, totalWords = 0, longestStreak = 0, currentStreak = 0;
	if (data) {
		data.fetchUser.points.forEach(e => {
			totalPoints += e.value;
		});
		data.fetchUser.createdPrompts.forEach(({ likes }) => { totalLikes += likes; })
		let entries = data.fetchUser.entries.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
		let prevDate = 0, today = (new Date()).setHours(0, 0, 0, 0), currStreakNot0 = false;
		entries.forEach((e) => {
			const currDate = (new Date(e.createdAt)).setHours(0, 0, 0, 0);
			const ONE_DAY = 1000 * 60 * 60 * 24;
			if (currDate > prevDate + ONE_DAY) {
				currentStreak = 0;
				prevDate = currDate;
			}
			currentStreak++;
			longestStreak = Math.max(longestStreak, currentStreak);
			currStreakNot0 = currDate === today;
		});
		if (!currStreakNot0) currentStreak = 0;
		data.fetchUser.entries.forEach(e => totalWords += e.words)
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2">
			<div className='sm:col-span-2 my-4 mx-2 md:mx-3'>
				{/*<h2 className='pl-4 mb-2 text-center'>Badges</h2>*/}
				<div className='rounded bg-white pb-2'>
					{loading ? <Spinner /> : <BadgesDisplay
						totalPoints={totalPoints}
						entries={data.fetchUser.entries}
						likes={totalLikes}
						totalWords={totalWords}
						longestStreak={longestStreak}
						currentStreak={currentStreak}
					/>}
				</div>
			</div>
		</div>
	)
}
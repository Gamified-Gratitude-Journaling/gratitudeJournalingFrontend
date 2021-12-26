
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import LeadingPlayer from "../components/LeadingPlayer";
import Spinner from '../components/Spinner/Spinner';

const LEADERBOARD_STATUS = gql`
  query LeaderboardStatus {
    leaderboardStatus {
		user {
			username
		}
		points	
    }
  }
`;

export default function MainPage() {
	// const [journalEntryUploadMutation] = useMutation(JOURNAL_ENTRY_UPLOAD_MUTATION);
	const { loading, error, data } = useQuery(LEADERBOARD_STATUS);
	// //const apolloClient = useApolloClient();
	// let calendarHeatMap = "";
	// if (loading) {calendarHeatMap = <p>Loading...</p>}
	// else if (error){calendarHeatMap = <p>{error}</p>}
	// else {calendarHeatMap = 
	// 	<Calendar
	// 		entries={data.journalEntryUploads}
	// 	/>
	// }
	// return (<div>
	// 	{calendarHeatMap}
	// </div>)

	return (
		<div>
			<div className='text-center'>
				<h1 style={{ fontSize: '48px' }}>Leaderboard</h1>
			</div>
			{!data ? <Spinner /> : data.leaderboardStatus.map(({points, user})=>{
				return <LeadingPlayer 
					key={user.username}
					user={user}
					points={points}
				/>
			})}
			{/*<div className = 'text-center'>
				<button  className = 'bg-white' type = 'submit'> Start Your Journal Now </button>
			</div>*/}
		</div>
	)
}
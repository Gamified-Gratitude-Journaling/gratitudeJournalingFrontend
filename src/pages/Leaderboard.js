
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useContext, useEffect } from 'react';
import LeadingPlayer from "../components/LeadingPlayer";
import Spinner from '../components/Spinner/Spinner';
import authContext from '../context/auth-context';

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
	const { loading, error, data, refetch } = useQuery(LEADERBOARD_STATUS);
	const {isTreatment} = useContext(authContext);
	useEffect(refetch,[]);

	return (
		<div>
			<div className='text-center'>
				<h1 style={{ fontSize: '48px' }}>
					{isTreatment ? "Users" : "Leaderboard"}
				</h1>
			</div>
			{!data ? <Spinner /> : data.leaderboardStatus.map(({points, user}, place)=>{
				return <LeadingPlayer 
					key={user.username}
					user={user}
					points={points}
					place={place+1}
				/>
			})}
		</div>
	)
}

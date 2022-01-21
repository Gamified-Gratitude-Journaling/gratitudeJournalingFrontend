import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import PointCalendar from '../../components/PointCalendar';
import JournalCalendar from '../../components/JournalCalendar';
import Spinner from '../../components/Spinner/Spinner';
import { useContext, useEffect } from "react";
import authContext from "../../context/auth-context";

const FETCH_USER_QUERY = gql`
  query Overview($username: String!){
	  	fetchUser(username: $username){
			points {
				createdAt
				value
			}
			entries{
				_id
				createdAt
				words
			}
		}
  }
`;

export default function Overview() {
	const { username } = useParams();
	const { loading, error, data, refetch } = useQuery(FETCH_USER_QUERY, { variables: { username } });
	const { isTreatment } = useContext(authContext);
	useEffect(refetch)

	return (
		<div className={`grid grid-cols-1 ${!isTreatment && "sm:grid-cols-2"}`}>
			{!isTreatment && <div className='my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2 text-center'>Point History</h2>
				<div className='rounded bg-white pb-2'>
					{loading ? <Spinner /> : <PointCalendar
						entries={data.fetchUser.points}
						rows={4}
						cols={7}
					/>}
				</div>
			</div>}
			<div className='my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2 text-center'>Journal History</h2>
				<div className='rounded bg-white pb-2'>
					{loading ? <Spinner /> : <JournalCalendar
						entries={data.fetchUser.entries}
						rows={4}
						cols={7}
					/>}
				</div>
			</div>
		</div>
	)
}
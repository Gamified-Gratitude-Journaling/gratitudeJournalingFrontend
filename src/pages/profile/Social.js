import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import Spinner from '../../components/Spinner/Spinner';

const FETCH_USER_QUERY = gql`
  query FetchUser($username: String!){
	  	fetchUser(username: $username){
			  followers {
				  username
			  }
			  following {
				  username
			  }
		}
  }
`;

export default function Social() {
	const {username} = useParams();
	const { loading, error, data} = useQuery(FETCH_USER_QUERY, { variables: { username } });
	console.log(data);
	if (loading) {return <Spinner />}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2">
			<div className='my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2 text-center'>Followers</h2>
				<div className='rounded bg-white pb-2'>
				</div>
			</div>
			<div className='my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2 text-center'>Following</h2>
				<div className='rounded bg-white pb-2'>
				</div>
			</div>
		</div>
	)
}
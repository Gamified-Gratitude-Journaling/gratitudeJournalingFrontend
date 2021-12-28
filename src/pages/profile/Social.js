import { useQuery, gql } from "@apollo/client";
import { CgProfile } from "react-icons/cg";
import { NavLink, useParams } from "react-router-dom";

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

const UserList = ({ users }) => {
	if (!users.length || users.length === 0) { return <p className="text-center">None</p> }
	return (<div className="grid grid-cols-1 w-full px-2 sm:px-10 space-y-2 pt-2">
		{users.map(({ username }) => (<div className="flex content-center overflow-hidden">
			<CgProfile className="h-10 w-10 mr-2" />
			<NavLink to={`/profile/${username}`} className='grid place-content-center'>
				<p>{username}</p>
			</NavLink>
		</div>))}
	</div>)
}

export default function Social() {
	const { username } = useParams();
	const { loading, error, data } = useQuery(FETCH_USER_QUERY, { variables: { username } });
	console.log(data);
	if (loading) { return <Spinner /> }

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2">
			<div className='my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2 text-center'>Followers</h2>
				<div className='rounded bg-white pb-2'>
					<UserList
						users={data.fetchUser.followers}
					/>
				</div>
			</div>
			<div className='my-4 mx-2 md:mx-3'>
				<h2 className='pl-4 mb-2 text-center'>Following</h2>
				<div className='rounded bg-white pb-2'>
					<UserList
						users={data.fetchUser.following}
					/>
				</div>
			</div>
		</div>
	)
}
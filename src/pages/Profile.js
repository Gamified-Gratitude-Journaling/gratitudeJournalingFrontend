import { gql, useQuery, useMutation, } from '@apollo/client';
import { CgProfile } from 'react-icons/cg';
import { NavLink, Route, Routes, useParams, } from 'react-router-dom';
import { useContext } from 'react';

import authContext from '../context/auth-context';
import Badges from './profile/Badges';
import Overview from './profile/Overview';
import Social from './profile/Social';
import Prompts from './profile/Prompts';

const ISFOLLOWING_QUERY = gql`
  query IsFollowing($followee: String!){
	isFollowing(followee: $followee)
  }
`;

const TOGGLE_FOLLOW_MUTATION = gql`
  mutation ToggleFollow($followee: String!){
	  	toggleFollow(followee: $followee){
			username
		}
  }
`;

const links = [
	{path: '', component: <NavLink to="">Overview</NavLink>},
	{path: 'badges', component: <NavLink to="badges">Badges</NavLink>},
	{path: 'prompts', component: <NavLink to="prompts">Prompts</NavLink>},
	{path: 'social', component: <NavLink to="social">Social</NavLink>},
];

export default function Profile() {
	const { token, username: currentUsername } = useContext(authContext);
	let { username, '*': active } = useParams();
	const { loading, error, data } = useQuery(ISFOLLOWING_QUERY, { variables: { followee: username } });
	const [toggleFollowMutation] = useMutation(TOGGLE_FOLLOW_MUTATION, {
		refetchQueries: [ISFOLLOWING_QUERY],
		variables: { followee: username }
	});
	if (error) {
		if ("User not found".localeCompare(error.message) === 0) return <p>User not found</p>
		if ("Not signed in".localeCompare(error.message) !== 0) return <p>An error has occurred. Try refreshing the page. </p>
	}

	return (
		<div className="grid grid-cols-1 overflow-hidden pb-40">
			<div className='flex mx-auto'>
				<CgProfile className='w-40 h-40' />
				<div className='place-self-center ml-5'>
					<h1 className='text-center mt-4'>{username}</h1>
					{token && username !== currentUsername && <button className='px-2 mt-2'
						onClick={() => toggleFollowMutation()}
					>
						{data && data.isFollowing ? "Following" : "Follow"}
					</button>}
				</div>
			</div>
			<div className='grid place-content-center w-full mt-8'>
				<ul className='list-none flex space-x-10 overflow-x-auto '>
					{links.map(link => (<li 
						key={link.path}
						className={link.path.localeCompare(active) === 0 && 'text-hoverColor'}
					>
						{link.component}
					</li>))}
				</ul>
			</div>
			<div className='w-screen border-b-4 mt-2 mb-16 w-inf -ml-96' />
			<Routes>
				<Route path="badges" element={<Badges />} />
				<Route path="social" element={<Social />} />
				<Route path="prompts" element={<Prompts />} />
				<Route path="*" element={<Overview />} />
			</Routes>
		</div>
	);
}
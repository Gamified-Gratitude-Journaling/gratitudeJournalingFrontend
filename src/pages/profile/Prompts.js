import { useMemo } from 'react';
import { useQuery, gql } from "@apollo/client";
import { NavLink, useParams } from "react-router-dom";

import Spinner from '../../components/Spinner/Spinner';
import Table from '../../components/Table';

const FETCH_USER_QUERY = gql`
  query FetchUser($username: String!){
	  	fetchUser(username: $username){
			createdPrompts {
				content
				likes
				createdAt
			}
		}
  }
`;

export default function Prompts() {
	const { username } = useParams();
	const { loading, error, data: qdata} = useQuery(FETCH_USER_QUERY, { variables: { username } });
	let prompts = [];
	if (qdata) { prompts = qdata.fetchUser.createdPrompts }

	const data = useMemo(
		() => [
			...prompts.map(prompt => ({
				date: (new Date(prompt.createdAt)).toLocaleDateString(),
				content: prompt.content,
				likes: prompt.likes,
			}))
		],
		[qdata]
	)

	const columns = useMemo(
		() => [
			{
				Header: 'Date',
				accessor: 'date',
			},
			{
				Header: 'Content',
				accessor: 'content',
				contentClassname: 'overflow-scroll',
			},
			{
				Header: 'Likes',
				accessor: 'likes',
			},
		],
		[]
	)

	if (loading) { return <Spinner /> }

	return (
		<div className="grid grid-cols-1">
			<NavLink to="/contribute"><p className='text-center text-gray-400 mb-10 hover:text-yellow-400'>Contribute?</p></NavLink>
			<h2 className='pl-4 mb-2 text-center'>Contributed Prompts</h2>
			{prompts.length === 0 ? <p className='text-center'>No prompts</p> : <Table
				columns={columns}
				data={data}
			/>}
		</div>
	)
}
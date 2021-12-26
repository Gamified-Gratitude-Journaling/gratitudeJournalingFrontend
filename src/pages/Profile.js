import React, { useEffect, useState, } from 'react';
import { useApolloClient, gql, useMutation, useQuery, } from '@apollo/client';
import PointCalendar from '../components/PointCalendar';

import Spinner from '../components/Spinner/Spinner';
import { useParams } from 'react-router-dom';

const POINTS_QUERY = gql`
  query Points($username: String!){
	  	fetchUser(username: $username){
			points {
				createdAt
				value
			}
			entries{
				_id
			}
		}
  }
`;


export default function Profile() {
	const apolloClient = useApolloClient();
	apolloClient.resetStore();
	let {username} = useParams();
	const { loading: ploading, error: perror, data: pdata } = useQuery(POINTS_QUERY, {variables: {username}});
	if (perror) {
		return <p>User not found</p>
	}
	const token = sessionStorage.getItem("token");

	let totalPoints = 0;
	if (pdata) {
		pdata.fetchUser.points.forEach(e => {
			totalPoints += e.value;
		});
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-8 space-y-16">
			{token && (<div className='sm:col-span-2'>
				<h2 className='pl-4 mb-2'>Surveys</h2>
				<div className='grid grid-cols-3 rounded bg-white pb-2 place-content-evenly'>
					<div className='place-self-center'>
						<h2>To be completed:</h2>
					</div>
				</div>
			</div>)}
			<div>
				<h2 className='pl-4 mb-2'>Activity History</h2>
				<div className='rounded bg-white pb-2'>
					{ploading ? <Spinner /> : <PointCalendar
						entries={pdata.fetchUser.points}
						rows={4}
						cols={7}
					/>}
				</div>
			</div>
			<div>
				<h2 className='pl-4 mb-2'>Badges</h2>
				<div className='rounded bg-white pb-2'>
				</div>
			</div>
			<div className='sm:col-span-2'>
				<h2 className='pl-4 mb-2'>Stats</h2>
				<div className='grid grid-cols-3 rounded bg-white pb-2'>
					<p>Total Points: {totalPoints}</p>
				</div>
			</div>
		</div>
	);
}
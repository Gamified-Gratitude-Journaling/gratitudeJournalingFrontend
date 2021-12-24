import React, { useEffect, useState, } from 'react';
import { useApolloClient, gql, useMutation, useQuery, } from '@apollo/client';
import Calendar from '../components/Calendar';

import Spinner from '../components/Spinner/Spinner';

const POINTS_QUERY = gql`
  query Points{
	  	points{
		  createdAt
		  value
		}
  }
`;

export default function Profile() {
	const apolloClient = useApolloClient();
	apolloClient.resetStore();
	const { loading: ploading, error: perror, data: pdata } = useQuery(POINTS_QUERY);

	return (

		<div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-8 space-y-16">
			<div>
				<h2 className='pl-4 mb-2'>Activity History</h2>
				<div className='rounded bg-white pb-2'>
					{ploading ? <Spinner /> : <Calendar
						entries={pdata.points}
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
			<div className='rounded bg-gray-500 sm:col-span-2'><p>Stats</p></div>
		</div>
	);
}
import React, { useEffect, useState, } from 'react';
import { useApolloClient, gql, useMutation, useQuery, } from '@apollo/client';
import '../index.css';

import JournalEditor from '../components/JournalEditor';
import Spinner from '../components/Spinner/Spinner';
import PromptDisplay from '../components/PromptDisplay';
import { debounce, initial } from 'lodash';
import DraftjsTextEditor from '../components/DraftjsTextEditor';

const JOURNAL_ENTRY_UPLOAD_MUTATION = gql`
  mutation JournalEntryUpload($content: String!) {
    journalEntryUpload(content: $content) {
		createdAt
		content
    }
  }
`;

const CURRENT_ENTRY = gql`
  query CurrentEntry{
	  currentEntry{
		  createdAt
		  content
		  _id
		}
  }
`;

export default function Journal() {
	const [journalEntryUploadMutation, { loading: mutateLoading }] = useMutation(JOURNAL_ENTRY_UPLOAD_MUTATION, {
		refetchQueries: [CURRENT_ENTRY]
	});
	const { loading, error, data } = useQuery(CURRENT_ENTRY);
	let initialContent = "null";
	if (data && data.currentEntry) { initialContent = data.currentEntry.content; }
	console.log(data);

	return (
		<div className='grid grid-flow-row grid-rows-2'>
			<div>
				<PromptDisplay />
			</div>

			

			<div class="max-w-7xl">
				<div>
					<h1 className='text-center'>Answer this prompt!</h1>
				</div>
				{loading ? <Spinner /> : (<div className = '' id='journalEditor'>
					<JournalEditor
						onContentChange={debounce((content) => {
							journalEntryUploadMutation({ variables: { content } });
						}, 1000)}
						initialContent={JSON.parse(initialContent)}
					/>
					<p className='text-opacity-50'>{mutateLoading ? "Saving..." : "Saved"}</p>
					
					{/* <DraftjsTextEditor/> */}
				</div>)}
			</div>
		</div>
	);
}
import React, { useEffect, useState, } from 'react';
import { useApolloClient, gql, useMutation, useQuery, } from '@apollo/client';
import '../index.css';

import JournalEditor from '../components/JournalEditor';
import Spinner from '../components/Spinner/Spinner';
import PromptDisplay from '../components/PromptDisplay';
import { debounce, initial } from 'lodash';
import DraftjsTextEditor from '../components/DraftjsTextEditor';
import QuillTextEditor from '../components/QuillTextEditor';

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
	const { loading, error, data, } = useQuery(CURRENT_ENTRY);
	let initialContent = "null";
	if (data && data.currentEntry) { initialContent = data.currentEntry.content; }

	return (
		<div className='pt-16'>
			<div>
				<PromptDisplay />
			</div>

			<div class="">
				{loading ? <Spinner /> : (
					<div className='grid place-content-center space-y-2'>
						<div className='' id='journalEditor'>
							<JournalEditor
								onContentChange={debounce((content) => {
									journalEntryUploadMutation({ variables: { content } });
								}, 1000)}
								initialContent={JSON.parse(initialContent)}
							/>
						</div>
						<button className='px-2'>Submit Journal</button>
					</div>
				)}
			</div>
		</div>
	);
}
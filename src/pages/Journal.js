import React, { useEffect, useState, } from 'react';
import { useApolloClient, gql, useMutation, useQuery, } from '@apollo/client';
import '../index.css';

import JournalEditor from '../components/JournalEditor';
import Spinner from '../components/Spinner/Spinner';
import PromptDisplay from '../components/PromptDisplay';
import { debounce, initial } from 'lodash';

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

	return (
		<div>
			<div>
				<PromptDisplay />
			</div>
			<div class="border-2 max-w-7xl">
				{loading ? <Spinner /> : (<div>
					<JournalEditor
						onContentChange={debounce((content) => {
							journalEntryUploadMutation({ variables: { content } });
						}, 1000)}
						initialContent={JSON.parse(initialContent)}
					/>
					<p className='text-opacity-50'>{mutateLoading ? "Saving..." : "Saved"}</p>
				</div>)}
			</div>
		</div>
	);
}
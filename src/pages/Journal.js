import React, { useEffect, useState, } from 'react';
import { useApolloClient, gql, useMutation, useQuery, } from '@apollo/client';
import '../index.css';

import JournalEditor from '../components/JournalEditor';
import Spinner from '../components/Spinner/Spinner';

const JOURNAL_ENTRY_UPLOAD_MUTATION = gql`
  mutation JournalEntryUpload($content: String!) {
    journalEntryUpload(content: $content) {
		createdAt
		content
    }
  }
`;

const JOURNAL_ENTRY_UPLOADS = gql`
  query JournalEntryUploads{
	  journalEntryUploads{
		  createdAt
		  content
		}
  }
`;

export default function Journal() {
	const apolloClient = useApolloClient();
	const [journalEntryUploadMutation] = useMutation(JOURNAL_ENTRY_UPLOAD_MUTATION);
	const { loading, error, data } = useQuery(JOURNAL_ENTRY_UPLOADS);

	let initialContent = "null";
	if (data) {
		initialContent = [""];
		data.journalEntryUploads.forEach(e => {
			if (e.createdAt.localeCompare(initialContent[0]) > 0) {
				initialContent = [e.createdAt, e.content];
			}
		})
		initialContent = initialContent[1];
	}

	return (
		<div className='container'>
			<div class="border-2 max-w-7xl">
				{loading ? <Spinner /> :
					<JournalEditor
						onContentChange={(content) => {
							journalEntryUploadMutation({ variables: { content } }).then(() => {
								apolloClient.resetStore();
							});
						}}
						initialContent={JSON.parse(initialContent)}
					/>
				}
			</div>
		</div>
	);
}
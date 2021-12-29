import React, { useEffect, useState, } from 'react';
import { useApolloClient, gql, useMutation, useQuery, } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

import JournalEditor from '../components/JournalEditor';
import Spinner from '../components/Spinner/Spinner';
import Notification from '../components/Notification';
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

const SUBMIT_MUTATION = gql`
  mutation SubmitEntry {
    submitEntry 
  }
`;

const CURRENT_ENTRY = gql`
  query CurrentEntry{
	  currentEntry{
		  createdAt
		  content
		  _id
		  wasSubmitted
		}
  }
`;

export default function Journal() {
	const [journalEntryUploadMutation, { loading: mutateLoading, data: mutateData }] = useMutation(JOURNAL_ENTRY_UPLOAD_MUTATION, {
		refetchQueries: [CURRENT_ENTRY]
	});
	const [submitJournalMutation,] = useMutation(SUBMIT_MUTATION, {
		refetchQueries: [CURRENT_ENTRY]
	});
	const { loading, error, data, } = useQuery(CURRENT_ENTRY);

	let initialContent = "null";
	if (data && data.currentEntry) { initialContent = data.currentEntry.content; }

	const submitJournal = async () => {
		const wasSubmitted = data.currentEntry.wasSubmitted;
		const upload=Promise.all([
			journalEntryUploadMutation({ variables: { content: initialContent } }),
			submitJournalMutation(),
		])
		toast.promise(upload, {
			loading: 'Saving...',
			success: wasSubmitted ? "Entry Updated!" : "Journal Created! +10 pts",
			error: "Error! Please try again",
		})
	}
	console.log(mutateData, mutateLoading);

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
						{initialContent.localeCompare('null') !== 0 && <button className='px-2' onClick={submitJournal}>
							{mutateLoading ? "Saving..." : (
								mutateData ? "Submitted" : "Submit"
							)}
						</button>}
					</div>
				)}
			</div>
			<ToastContainer
				position='top-right'
				autoClose={2000}
				closeOnClick
			/>
		</div>
	);
}
import React, { useContext } from 'react';
import { gql, useMutation, useQuery, } from '@apollo/client';
import { toast } from 'react-toastify';
import '../index.css';

import JournalEditor from '../components/JournalEditor';
import Spinner from '../components/Spinner/Spinner';
import PromptDisplay from '../components/PromptDisplay';
import { debounce, } from 'lodash';
import { NavLink } from 'react-router-dom';
import authContext from '../context/auth-context';

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
	const [submitJournalMutation,{loading: submitLoading, data: submitData}] = useMutation(SUBMIT_MUTATION, {
		refetchQueries: [CURRENT_ENTRY]
	});
	const { loading, error, data, } = useQuery(CURRENT_ENTRY);
	const {username, isTreatment} = useContext(authContext);

	let initialContent = "null";
	if (data && data.currentEntry) { initialContent = data.currentEntry.content; }

	const submitJournal = async () => {
		const wasSubmitted = data.currentEntry.wasSubmitted;
		const upload=Promise.all([
			journalEntryUploadMutation({ variables: { content: initialContent } }),
			submitJournalMutation(),
		])
		toast.promise(upload, {
			pending: 'Saving...',
			success: {render(){return <div className='flex place-content-between'>
				{wasSubmitted ? "Entry Updated!" : (<div>
					<p>Journal Created!</p>
					{!isTreatment && <p>+10 pts</p>}
				</div>)}
				<NavLink to={`/profile/${username}`}>View Profile</NavLink>
			</div>}},
			error: "Error! Please try again",
		},{autoClose: 10000})
	}

	return (
		<div className='pt-16'>
			<div>
				<PromptDisplay />
			</div>

			<div class="w-full">
				{loading ? <Spinner /> : (
					<div className='grid w-full place-content-center space-y-2'>
						<div className='w-full' id='journalEditor'>
							<JournalEditor
								onContentChange={debounce((content) => {
									journalEntryUploadMutation({ variables: { content } });
								}, 1000)}
								initialContent={JSON.parse(initialContent)}
							/>
						</div>
						{initialContent.localeCompare('null') !== 0 && <button className='px-2' onClick={submitJournal}>
							{submitLoading ? "Saving..." : (
								submitData ? "Submitted" : "Submit"
							)}
						</button>}
					</div>
				)}
			</div>
		</div>
	);
}

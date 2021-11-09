/*
Add entry functionality
- Journal entry editor block/space
- Submit button and/or auto-save
 */

import Editor from "../components/JournalEditor";
import { gql, useApolloClient, useMutation } from '@apollo/client';

const JOURNAL_ENTRY_UPLOAD_MUTATION = gql`
  mutation journalEntryUpload($content: String!) {
    journalEntryUpload(content: $content) {
		createdAt
		content
    }
  }
`;

export default function MainPage() {
	const [journalEntryUploadMutation] = useMutation(
		JOURNAL_ENTRY_UPLOAD_MUTATION
	);
	const apolloClient = useApolloClient();
	return (<div class="border-2">
		<Editor
			onContentChange={(content) => {
				journalEntryUploadMutation({ variables: { content } }).then(() => {
					apolloClient.resetStore();
				});
			}}
		/>
	</div>
	)
}
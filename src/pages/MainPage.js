/*
Add entry functionality
- Journal entry editor block/space
- Submit button and/or auto-save
 */

import Editor from "../components/JournalEditor";
import Calendar from "../components/Calendar";
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
// import logo from "./images/gratitude symbol.png"
import NavBar from "../components/NavBar";
import LeadingPlayers from "../components/LeadingPlayers";

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

export default function MainPage() {
	// const [journalEntryUploadMutation] = useMutation(JOURNAL_ENTRY_UPLOAD_MUTATION);
	// const { loading, error, data } = useQuery(JOURNAL_ENTRY_UPLOADS);
	// //const apolloClient = useApolloClient();
	// let calendarHeatMap = "";
	// if (loading) {calendarHeatMap = <p>Loading...</p>}
	// else if (error){calendarHeatMap = <p>{error}</p>}
	// else {calendarHeatMap = 
	// 	<Calendar
	// 		entries={data.journalEntryUploads}
	// 	/>
	// }
	// return (<div>
	// 	<div class="border-2 max-w-7xl">
	// 		<Editor
	// 			onContentChange={(content) => {
	// 				journalEntryUploadMutation({ variables: { content } });
	// 					/*
	// 				journalEntryUploadMutation({ variables: { content } }).then(() => {
	// 					apolloClient.resetStore();
	// 				});*/
	// 			}}
	// 		/>
	// 	</div>
	// 	{calendarHeatMap}
	// </div>)

	return (
		<div>
			<NavBar/>
			<div className='text-center p-5'>
				<h1 style = {{fontSize: '48px', fontFamily:'Montserrat'}}>LEADING PLAYERS</h1>
			</div>
			
			{/* TO-DO: Add props */}
			<LeadingPlayers/>
			<LeadingPlayers/>
			<LeadingPlayers/>

			<div className = 'text-center'>
				<button  className = 'bg-white' type = 'submit'> Start Your Journal Now </button>

			</div>


		</div>
		

		
	)
}
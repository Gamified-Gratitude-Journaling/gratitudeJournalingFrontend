import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react"
import Spinner from "../components/Spinner/Spinner";
import authContext from "../context/auth-context";

const SUBMIT_PROMPT = gql(`
	mutation SubmitPrompt($content: String!){
		createPrompt(content: $content) {
			content
		}
	}
`)

export default function Contribute() {
	const [content, setContent] = useState("");
	const [submitPromptMutation, {loading, error, data}] = useMutation(SUBMIT_PROMPT);
	const {username} = useContext(authContext);
	if (loading) {return <Spinner /> }
	if (error) {return <h1 className="text-center">Something went wrong, please refresh the page and try again</h1>}
	if (data) {
		return <div>
			<h1 className="text-center my-20">Success!</h1>
			<a href={`/profile/${username}/prompts`}><p className="text-center">View Prompts</p></a>
		</div>
	}

	return (<form>
		<label className="grid w-full px-4 page">
			<h1 className="text-center text-2xl md:text-4xl text-gray-400">Write a prompt for others!</h1>
			<textarea 
				className="rounded w-full my-3 h-screen-3/6 text-center text-lg text-gray-500 py-6 px-8" 
				value={content}
				onChange={(event) => {setContent(event.target.value)}}
			/>
			<button onClick={(event) => {event.preventDefault(); submitPromptMutation({variables: {content}})}}><p className="mx-4">Submit</p></button>
		</label>
	</form>)
}
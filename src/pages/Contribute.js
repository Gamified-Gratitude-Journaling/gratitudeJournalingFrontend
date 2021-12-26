import { gql, useMutation } from "@apollo/client";
import { useState } from "react"
import { NavLink } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

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
	//console.log(loading,error,data);
	if (loading) {return <Spinner /> }
	if (error) {return <h1 className="text-center">Something went wrong, please refresh the page and try again</h1>}
	if (data) {
		return <div>
			<h1 className="text-center my-20">Success!</h1>
			<NavLink to="/Journal"><p className="text-center">Return to Home</p></NavLink>
		</div>
	}

	return (<form>
		<label className="grid w-full px-4">
			<h1 className="text-center text-2xl md:text-4xl text-gray-400">Write a prompt for others!</h1>
			<textarea 
				className="rounded w-full my-3 h-40 text-center text-lg text-gray-500 py-6 px-8" 
				value={content}
				onChange={(event) => {setContent(event.target.value)}}
			/>
			<button onClick={(event) => {event.preventDefault(); submitPromptMutation({variables: {content}})}}><p className="mx-4">Submit</p></button>
		</label>
	</form>)
}
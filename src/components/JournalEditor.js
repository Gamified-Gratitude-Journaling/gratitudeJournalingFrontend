import React, { useState } from 'react';
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';



export default function JournalEditor({ initialContent, onContentChange }) {
	if (!initialContent) { initialContent = EditorState.createEmpty() }
	else { initialContent = EditorState.createWithContent(convertFromRaw(initialContent)) }
	const [editorState, setEditorState] = useState(initialContent);

	const handleEditorChange = (state) => {
		setEditorState(state);
		convertContentToHTML();
	}
	const convertContentToHTML = () => {
		let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
		EditorState.setConvertedContent(currentContentAsHTML);
	}

	return (<div className='w-screen'>
		<div className='w-3/6 mx-auto'>
			<Editor
				editorClassName='border-2 overflow-y-auto bg-white px-4 sm:px-8'
				defaultContentState={initialContent}
				editorState={editorState}
				onEditorStateChange={(state) => {
					if (onContentChange) {
						onContentChange(JSON.stringify(convertToRaw(state.getCurrentContent()), null, 4));
					}
					setEditorState(state);
				}}
				toolbar={{
					options: ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'emoji', 'image', 'history'],
					inline: {
						options: ['bold', 'italic', 'underline'],
					},
					blockType: {
						options: ['H1', 'H2', 'Normal'],
					},
					list: {
						options: ['unordered', 'ordered'],
					},

					link: { inDropdown: true },
					history: { inDropdown: false },
				}}

			/>
		</div>
	</div>);
}


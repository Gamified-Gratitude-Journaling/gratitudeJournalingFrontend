import React, { useState } from 'react';
import { convertToRaw, ContentState, EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { debounce } from 'lodash';

const JournalEditor = ({ initialContent, onContentChange }) => {
	console.log(initialContent);
	if (!initialContent) {initialContent = EditorState.createEmpty()}
	else {initialContent = EditorState.createWithContent(convertFromRaw(initialContent))}
	const [editorState, setEditorState] = useState(initialContent);
	return (<React.Fragment>
		<Editor
			editorClassName="border-2 max-h-80 min-h-full overflow-auto"
			defaultContentState={initialContent}
			editorState={editorState}
			onEditorStateChange={(state) => {
				console.log(state.getCurrentContent());
				if (onContentChange) {
					//onContentChange(this, JSON.stringify(state, null, 4));
					debounce(onContentChange.bind(this, JSON.stringify(convertToRaw(state.getCurrentContent()), null, 4)), 1000).call();
				}
				setEditorState(state);
			}}
			toolbar={{
				options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'emoji', 'image', 'history'],
				inline: { inDropdown: true },
				list: { inDropdown: true },
				textAlign: { inDropdown: true },
				link: { inDropdown: true },
				history: { inDropdown: false },
			}}
		/>
	</React.Fragment>);
}

export default JournalEditor;

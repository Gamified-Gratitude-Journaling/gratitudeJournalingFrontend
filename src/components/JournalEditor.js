import React, { useState } from 'react';
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function JournalEditor({ initialContent, onContentChange }) {
	if (!initialContent) { initialContent = EditorState.createEmpty() }
	else { initialContent = EditorState.createWithContent(convertFromRaw(initialContent)) }
	const [editorState, setEditorState] = useState(initialContent);
	return (<React.Fragment>
		<Editor
			editorClassName="border-2 max-h-80 min-h-full overflow-auto bg-gray-100"
			defaultContentState={initialContent}
			editorState={editorState}
			onEditorStateChange={(state) => {
				if (onContentChange) {
					onContentChange(JSON.stringify(convertToRaw(state.getCurrentContent()), null, 4));
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
			toolbarOnFocus
		/>
	</React.Fragment>);
}


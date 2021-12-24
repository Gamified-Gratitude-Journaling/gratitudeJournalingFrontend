import React, { useState } from 'react';
import { convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { debounce } from 'lodash';

const JournalEditor = ({ initialContent, onContentChange }) => {
	if (!initialContent) {
		initialContent = convertToRaw(ContentState.createFromText("loading..."));
	}
	const [contentState, setContentState] = useState(initialContent);
	return (<div>
		<Editor
			editorClassName="border-2 max-h-80 min-h-full overflow-auto"
			defaultContentState={initialContent}
			contentState={contentState}
			onContentStateChange={debounce((state) => {
				if (onContentChange) onContentChange(JSON.stringify(state, null, 4))
				setContentState(state);
			}, 1000)}
		/>
	</div>);
}

export default JournalEditor;

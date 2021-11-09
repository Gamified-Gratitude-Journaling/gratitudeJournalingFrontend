import React, { useState } from 'react';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {debounce} from 'lodash';

const JournalEditor = ({initialMessage, onContentChange}) => {
	if (!initialMessage){
		initialMessage="Default Message"
	}
	const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": initialMessage, "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };
	const [contentState, setContentState] = useState(convertFromRaw(content));
	return (<div>
		<Editor
			editorClassName="border-2 max-h-80 h-52 overflow-auto"
			onContentStateChange={debounce((state) => {
				if (onContentChange) onContentChange(JSON.stringify(state, null, 4))
				setContentState(state)
			}, 1000)}
		/>
		<p>
			{JSON.stringify(contentState, null, 4)}
		</p>
		<div class="h-52 bg-gradient-to-r from-red-500">

		</div>
	</div>);
}

export default JournalEditor;

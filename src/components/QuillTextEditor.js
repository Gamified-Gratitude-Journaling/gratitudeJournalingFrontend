import React from 'react';
import ReactQuill from 'quill';
import '../../node_modules/quill/dist/quill.snow.css';

export default function QuillTextEditor() {
    return(
        <ReactQuill placeholder = 'Write something'/>
    )
}
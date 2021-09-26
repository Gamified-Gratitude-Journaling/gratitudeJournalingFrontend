import { gql, useApolloClient, useMutation } from '@apollo/client';
import React from 'react';

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

export default function UploadBlob() {
  const [name, setName] = React.useState('');
  const [content, setContent] = React.useState('');
  // Refer to ./UploadFile.js
  const [singleUploadMutation] = useMutation(
    SINGLE_UPLOAD_MUTATION
  );
  const apolloClient = useApolloClient();

  // Object destructuring equivalent to const value = event.target.value
  const onNameChange = ({ target: { value } }) => setName(value);
  const onContentChange = ({ target: { value } }) => setContent(value);
  const onSubmit = (event) => {
    event.preventDefault();

    const file = new Blob([content], { type: 'text/plain' });
    file.name = `${name}.txt`;

    singleUploadMutation({ variables: { file } }).then(() => {
      apolloClient.resetStore();
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="filename">
          File name (without .txt): 
        </label>
        <input
          type="text"
          id="filename"
          value={name}
          onChange={onNameChange}
        >
        </input>
      </div>
      <div>
        <label htmlFor="content">Content: </label>
        <textarea
          placeholder="Content"
          required
          value={content}
          onChange={onContentChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form >
  );
}

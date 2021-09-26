import React from 'react';

import UploadBlob from './components/UploadBlob';
import UploadFile from './components/UploadFile';
import UploadFileList from './components/UploadFileList';
import Uploads from './components/Uploads';

// Render each example Component with an appropriate header
const app = () => {
  return (
    <React.Fragment>
      <div>
        <h1>Upload File</h1>
        <UploadFile />
      </div>
      <div>
        <h1>Upload FileList</h1>
        <UploadFileList />
      </div>
      <div>
        <h1>Upload Blob</h1>
        <UploadBlob />
      </div>
      <div>
        <h1>Uploads</h1>
        <Uploads />
      </div>
    </React.Fragment>
  );
}

export default app;

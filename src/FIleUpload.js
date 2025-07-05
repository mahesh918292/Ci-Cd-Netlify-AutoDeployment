import  { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setUrl(res.data.url);
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {url && (
        <div>
          <p>Uploaded File URL:</p>
          <a href={url} target="_blank" rel="noreferrer">{url}</a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

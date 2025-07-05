import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css'; // Custom CSS

const App = () => {
  const [file, setFile] = useState([]);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState(null)
  const inputRef = useRef();

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    setData(null)
    const formData = new FormData();
    file.forEach(f => formData.append('file', f));

    try { 
      setLoading(true);
      const res = await axios.post('http://ec2-3-110-44-114.ap-south-1.compute.amazonaws.com:5000/upload', formData);
      console.log(res.data)
      setUrl(res.data.urls);
      setFile(null);
      inputRef.current.value = '';
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setUrl([]);
    inputRef.current.value = '';
  };
  const GetAllData=async()=>{
    setUrl([])
    try { 
      const res = await axios.get('http://ec2-3-110-44-114.ap-south-1.compute.amazonaws.com:5000/getall');
      console.log(res.data)
      setData(res.data)
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed');
    } 
  }
  return (
    <div className="container">
      <h2>S3 File Uploader</h2>

      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={(e) => setFile([...e.target.files])}
      />

      <div className="btn-group">
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        <button onClick={handleReset} className="reset-btn">
          Reset
        </button>
        <button onClick={()=>GetAllData()}>
          Get All Data 
        </button>
      </div>

      {url && url.map((i,ind)=>{
        return <><li>{ind} {i} </li></>
      })}
      {
        data && data.map((i)=>{
          console.log(i)
          return <><li> {i.name}</li></>
        })
      }
    </div>
  );
};

export default App;

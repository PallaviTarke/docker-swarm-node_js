import React, { useState } from 'react'
import axios from 'axios'

function FileUploader() {
  const [file, setFile] = useState(null)
  const [hash, setHash] = useState('')
  const [error, setError] = useState('')

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axios.post('/api/upload', formData)
      setHash(res.data.hash)
      setError('')
    } catch (err) {
      setError('Upload failed')
      console.error(err)
    }
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload to IPFS</button>

      {hash && (
        <div>
          <p><strong>IPFS Hash:</strong> {hash}</p>
          <a href={`https://ipfs.io/ipfs/${hash}`} target="_blank" rel="noopener noreferrer">View on IPFS</a>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default FileUploader

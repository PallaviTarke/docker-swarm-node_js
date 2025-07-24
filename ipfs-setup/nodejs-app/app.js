const express = require('express');
const multer = require('multer');
const { create } = require('ipfs-http-client');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });
const ipfs = create({ url: 'http://ipfs1:5001' }); // use DNS name from overlay network

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const file = fs.readFileSync(filePath);
    const result = await ipfs.add(file);
    fs.unlinkSync(filePath); // cleanup
    res.json({ hash: result.path });
  } catch (err) {
    console.error(err);
    res.status(500).send('IPFS upload failed');
  }
});

app.listen(3000, () => console.log('Backend running on port 3000'));

const express = require('express');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const app = express();

app.get('/path_traversal', (req, res) => {
  const file_name = req.query.file;
  
  if (!file_name) {
    return res.status(400).send('File name not provided!');
  }

  const filePath = path.join(__dirname, 'services', file_name);
  console.log(`Resolved file path: ${filePath}`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      return res.status(404).send('File not found or cannot be opened!');
    }
    res.send(`File content:\n${data}`);
  });
});

app.get('/command_injection', (req, res) => {
  const userInput = req.query.command;
  console.log(userInput)
  exec(`${userInput}`, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr)
      return res.status(500).send('Error occurred');
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

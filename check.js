const fs = require('fs');
const path = require('path');

// ระบุ path ของไฟล์
const filePath = path.join(__dirname,"services", 'data2.txt'); // สามารถเปลี่ยนตาม path ของไฟล์จริง
console.log(filePath)
// อ่านไฟล์
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    return;
  }
  console.log('File content:\n', data);
});

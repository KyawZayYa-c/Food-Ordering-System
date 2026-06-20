const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
    // filePath က '/uploads/1781955.jpg' ဆိုရင် root folder ကနေ ဖြတ်ပေးမယ်
    const fullPath = path.join(__dirname, '../', filePath);
    console.log("Full Path to delete:", fullPath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};

module.exports = { deleteFile };
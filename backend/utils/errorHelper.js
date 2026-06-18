const path = require('path');
const moment = require('moment-timezone');
const fs = require('fs');

const DTime = {
    now : () => moment.tz("Asia/Rangoon").format("YYYY-MM-DD"),
    timeStamp : () => moment.tz("Asia/Rangoon").unix()
}

const errorFile = {
    write : (data) => {
        let fileName = DTime.now() + "_" + DTime.timeStamp() + ".txt";
        let filePath = path.join(__dirname,"../errors/"+fileName);
        fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
    },
    read : (fileName) => {
     let filePath = path.join(__dirname, "../errors/" + fileName + ".txt");
     let data =fs.readFileSync(filePath,{encoding: "utf-8"});
     return data
    }
}

module.exports= errorFile;
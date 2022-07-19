var fs = require('fs');
const url = "./public/img/guilds_album"

const fileList = []
//passsing directoryPath and callback function
fs.readdir(url, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  files.forEach(function (file, i) {
    const basicPath = url + "/"
    const group = file.match(/(.*?)(\(.*\))*(\.[Jj][Pp][Gg])/)
    const author = group[1]
    const fileType = group[3]
    const newName = "pic" + i + fileType
    fs.rename(basicPath + file, basicPath + newName, () => {
    })
    fileList.push({ file, author, newName })
  });
  fs.writeFile("./aaa.txt", JSON.stringify(fileList), () => { })
  console.log(fileList)
});

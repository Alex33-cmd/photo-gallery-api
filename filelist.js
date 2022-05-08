import { readdir, appendFile } from "fs";

// directory path
const dir = "./assets/";

// list all files in the directory
readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }

  // files object contains all files names
  // log them on console
  files.forEach((file) => {
    console.log(file);
    const text = `{
    "title":"${file.slice(0, -4)}",
    "type":"film",
    "url":"./${file}",
}\r\n`;

    appendFile("./list.txt", text, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });

  //   console.log(files);

  //   writeFile("./list.txt", files.join("\r\n"), (err) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //     console.log("file written successfully");
  //   });
});

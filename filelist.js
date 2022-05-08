import { readdir, appendFile } from "fs";

// directory path
const dir = "./assets/";

// list all files in the directory
readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }

  // files array contains all file names
  files.forEach((file) => {
    // storing every file info in object
    const text = {
      title: `${file.slice(0, -4)}`,
      type: `film`,
      url: `./${file}`,
    };

    // adding newlines and a couple of indentations to JSON
    const data = JSON.stringify(text, null, 2);

    // writing a JSON file
    appendFile("./filelist.json", data, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
  console.log(files);
});

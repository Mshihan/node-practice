const fs = require("fs");

fs.readFile("./txt/start.txt", "utf-8", (err1, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err2, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err3, data3) => {
      fs.writeFile(
        "./txt/final.txt",
        `${data2} \n${data3} \nFinalized`,
        "utf-8",
        (err4) => {
          if (err4) {
            console.log("Error..........");
          }
        }
      );
    });
  });
});

console.log("File reading......");

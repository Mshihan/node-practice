const fs = require("fs");

fs.readFile("./txt/start.txt", "utf-8", (err1, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err2, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err3, data3) => {
      fs.writeFile(
        "./txt/final.txt",
        `${data2} \n${data3} \nFinalized`,
        "utf-8",
        (err4) => {
          console.log(err1);
          console.log(err2);
          console.log(err3);
          console.log(err4);
        }
      );
    });
  });
});

console.log("File reading......");

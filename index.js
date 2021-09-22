const fs = require("fs");

//Output to terminal
const hello = "Hello world";
console.log(hello);

// Read from a file
const msg = fs.readFileSync("txt/input.txt", "utf-8");
console.log(msg);

//Ouput to file
const msg = fs.readFileSync("txt/input.txt", "utf-8");
const outputMessage = `Output text is ${msg}`;
fs.writeFileSync("txt/output.txt", outputMessage);

const http = require("http");
// const url = require("url");

///////////////
// SERVER
const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/overview") {
    res.end("This is landing OVERVIEW page");
  } else if (req.url === "/product") {
    res.end("This is PRODUCT page");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>This page is not exist</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Opening the web server...");
});

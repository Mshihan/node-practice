const http = require("http");
const fs = require("fs");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replateTemplate");

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const products = dataObj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Path Overview or Landing page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
    let overviewPage = tempOverview.replace("{%PRODUCTS%}", cardHtml);
    res.end(overviewPage);

    //Api path
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    //Products path
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    console.log(products[query.id]);

    const product = dataObj[query.id];
    const template = replaceTemplate(tempProduct, product);
    res.end(template);

    //Not found
  } else {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<h1>Site is not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Starting server............");
});

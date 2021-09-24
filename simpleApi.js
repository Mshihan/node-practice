const http = require("http");
const fs = require("fs");

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);

  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);

  if (product.organic === false) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  //Path Overview or Landing page
  if (pathName === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    let overviewPage = tempOverview.replace("{%PRODUCTS%}", cardHtml);
    res.end(overviewPage);

    //Api path
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    //Not found path
  } else {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<h1>Site is not found 💥</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Starting server............");
});

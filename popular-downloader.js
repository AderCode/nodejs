const path = require("path");
const fs = require("fs");
const request = require("request-promise");
const https = require("https");

let array = [];

request("https://reddit.com/r/popular.json", (err, res, body) => {
  if (err) console.log("Request Error: ", err);

  let jsonData = JSON.parse(body);
  // console.log(jsonData.data)

  JSON.parse(body).data.children.forEach(item => {
    if (item.data.post_hint == "image") {
      imgSource = item.data.url;

      https.get(imgSource, res => {
        res.pipe(
          fs.createWriteStream(
            `./downloads/${item.data.id}.${res.headers["content-type"].slice(
              6
            )}`
          )
        );
      });
    }

    if (item.data.post_hint == "rich:video") {
      imgSource = item.data.media.oembed.thumbnail_url;

      https.get(imgSource, res => {
        res.pipe(
          fs.createWriteStream(
            `./downloads/${item.data.id}.gif`
          )
        );
      });
    }
  });
});
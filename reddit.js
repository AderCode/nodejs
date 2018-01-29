const path = require("path");
const fs = require("fs");
const request = require('request-promise');
const dataPath = path.join(__dirname, "popular-articles.json");

let array = [];


request('https://reddit.com/r/popular.json', (err, res, body) => {
    if(err) console.log('Request Error: ', err);

    let jsonData = JSON.parse(body)
    // console.log(jsonData.data)

    JSON.parse(body).data.children.forEach(item => {
        array.push({
            Title: item.data.title,
            URL: item.data.url,
            Author: item.data.author,
            Media: item.data.media
        });
        
        fs.writeFile(dataPath, JSON.stringify(array), err => {
            if(err) console.log(err);
        });

    })

})
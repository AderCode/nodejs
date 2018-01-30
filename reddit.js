const path = require("path");
const fs = require("fs");
const rp = require('request-promise');
const dataPath = path.join(__dirname, "popular-articles.json");

let array = [];


rp({uri: 'https://reddit.com/r/popular.json', json: true }).then((body) => {

    body.data.children.forEach(item => {
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

}).catch((err) => {
    console.log('errCatcher: ', err)
})
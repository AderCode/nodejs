const path = require("path");
const fs = require("fs");
const rp = require("request-promise");
const https = require("https");
const url = require("url")

let array = [];

rp({uri: "https://reddit.com/r/popular.json", json: true})
.then(body => {

  body.data.children.forEach(item => {
        
    if (item.data.is_reddit_media_domain == true && item.data.is_video == false) {
      srcUrl = item.data.url;


      // SUCCESSFUL DOWNLOAD WITHOUT PIPE
      const options = {
        url: item.data.url,
        encoding: null
      };

      let fileExt = url.parse(srcUrl).pathname.split('.').pop();

      
      rp.get(options)
        .then(function (res) {
          const buffer = Buffer.from(res, 'utf8');
          fs.writeFileSync(`./downloads/${item.data.id}.${fileExt}`, buffer);
        });
      }
      // //


      // // FileExt creator success //
    //   let fileExt = url.parse(srcUrl).pathname.split('.').pop();

    //   https.get(srcUrl, res => {
    //     res.pipe(
    //       fs.createWriteStream(
    //         `./downloads/${item.data.id}.${fileExt}`
    //       )
    //     );
    //   });
    // }
    
    // // THIS STUFF KINDA WORKS
    // if (item.data.post_hint == "image") {
    //   imgSource = item.data.url;

    //   var fileExt = url.parse(imgSource).pathname.split('.').pop();
    //   console.log(fileExt)
      
      
    //   https.get(imgSource, res => {
    //     res.pipe(
    //       fs.createWriteStream(
    //         `./downloads/${item.data.id}.${fileExt}`
    //       )
    //     );
    //   });
    // }

    // if (item.data.post_hint == "rich:video") {
    //   imgSource = item.data.media.oembed.thumbnail_url;

    //   https.get(imgSource, res => {
    //     res.pipe(
    //       fs.createWriteStream(
    //         `./downloads/${item.data.id}.gif`
    //       )
    //     );
    //   });
    // }



  });
}).catch((err) => {
    console.log('ErrCatcher: ', err)
})
const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../chirps.json");

let chirpArray = [
  { chirp: "Chirp1" },
  { chirp: "Chirp2" },
  { chirp: "Chirp3" },
  { chirp: "Chirp4" },
  { chirp: "Chirp5" }
];

fs.writeFile(dataPath, JSON.stringify(chirpArray), err => {
    if(err) console.log(err);
});

fs.readFile(dataPath, {
    encoding: 'UTF-8'
}, (err, res) => {
    let chirps = JSON.parse(res);
    console.log(chirps);
});

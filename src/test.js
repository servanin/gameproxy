const fs=require('fs')
const HeroExporter = require("./HeroExporter");

const obj=JSON.parse(fs.readFileSync("./data/3.res.body.dec.json"))
console.log(HeroExporter.extractData("3149811",obj))
const obj2=JSON.parse(fs.readFileSync("./data/16.res.body.dec.json"))
console.log(HeroExporter.extractData("3149811",obj2))
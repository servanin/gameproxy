const mockttp = require('mockttp');
const fs = require('fs')
require('dotenv').config()
const CertificateGeneration = require("./CertificateGeneration");
const HBodyDecrypt = require("./HBodyDecrypt");
const HeroExporter = require("./HeroExporter");

const myConfig = {
    proxyPort: 11000,
    currentToken:process.env.CURRENT_TOKEN
}

let i=0
const regExSessionId=/.*"sessionId":"([^"]+)".*/g
let lastReqBody=""
let currentAccountId=""

if (!fs.existsSync("./data")) fs.mkdirSync("./data")
if (!fs.existsSync("./result")) fs.mkdirSync("./result")

if (!fs.existsSync("./key.pem") || !fs.existsSync("./cert.pem")) {
    const certResult = CertificateGeneration.generateNewCAandHost("test.com", ["test.com"])
    fs.writeFileSync("./key.pem", certResult.hostCert.privateKey)
    fs.writeFileSync("./cert.pem", certResult.hostCert.certificate)
    fs.writeFileSync("./rootCA.pem", certResult.CA.certificate)
    fs.writeFileSync("./rootCA.key", certResult.CA.privateKey)
}

const server = mockttp.getLocal({
    https: {
        keyPath: './key.pem',
        certPath: './cert.pem'
    }, debug: false
});

server.forPost("https://heroes-an.nextersglobal.com/api/").thenPassThrough({
        beforeRequest: (req) => {
            if (myConfig.currentToken.length<10) {
                console.error("Please login on https://gelonsoft.my.to/ via browser first")
                process.exit(1)
            }
            i=(i+1)%20
            console.log("API req #"+i+" " + req.method + " " + req.url)
            if (req?.headers?.['X-Auth-User-Id']) {
                currentAccountId=req?.headers?.['X-Auth-User-Id']
            }
            try {
                req.body.getText().then((text)=>{
                    lastReqBody =text
                    fs.writeFileSync("./data/" + (i) + ".req.data", lastReqBody)
                })
            } catch(e) {
                console.log("API req error",e)
            }
        },
        beforeResponse: (res) => {
            res.body.getText().then((respBodyD) => {
                console.log("API response #"+i)
                try {
                    let respBody=Buffer.from(""+respBodyD)
                    fs.writeFileSync("./data/"+i+".res.data",respBody.toString())
                    let testDecrypt=HBodyDecrypt.decryptBody(respBody)
                    let responseJSON=null
                    try {
                        responseJSON=JSON.parse(testDecrypt)
                    } catch(e) {
                        console.log("Failed to decrypt",e)
                    }
                    if (!responseJSON) {
                        testDecrypt=HBodyDecrypt.decryptUnknown(HBodyDecrypt.removeSignature(respBody).toString('utf8'))
                    }
                    try {
                        responseJSON=JSON.parse(testDecrypt)
                    } catch(e) {}
                    fs.writeFileSync("./data/"+i+".res.body.key.data",HBodyDecrypt.XOR_KEY)
                    fs.writeFileSync("./data/"+i+".res.body.dec.json",JSON.stringify(responseJSON || {}))
                    if (lastReqBody.includes("\"sessionId\":")) {
                        const newKey=lastReqBody.replaceAll(/[\r\n]/g,'').replaceAll(regExSessionId,'$1')
                        if (newKey && newKey?.length<100) {
                            HBodyDecrypt.XOR_KEY=newKey
                            console.log("New key from request is: "+HBodyDecrypt.XOR_KEY)
                        }
                    }
                    if (testDecrypt.includes("\"sessionId\":")) {
                        const newKey=testDecrypt.replaceAll(/[\r\n]/g,'').replaceAll(regExSessionId,'$1')
                        if (newKey && newKey?.length<100) {
                            HBodyDecrypt.XOR_KEY=newKey
                            console.log("New key from request is: "+HBodyDecrypt.XOR_KEY)
                        }
                    }
                    if (responseJSON && (testDecrypt.includes("\"currentSkin\":") || testDecrypt.includes("\"accountId\":"))) {
                        const dataToSend=HeroExporter.extractData(currentAccountId,responseJSON)
                        if (dataToSend) {
                            const textDataToSend=JSON.stringify(dataToSend)
                            fs.writeFileSync("./result/data."+i+".json",textDataToSend)
                            fetch("https://gelonsoftxxx.github.io:10000/api/svanin/submit",{
                                method: 'POST',
                                headers: {
                                    'x-access-token': myConfig.currentToken
                                },
                                body: textDataToSend
                            }).then(r =>{
                                if (r.status===401) {
                                    myConfig.currentToken=undefined
                                    fs.rmSync("./.env")
                                    console.log("Invalid token. Please login on https://gelonsoft.my.to/ via browser first")
                                    process.exit(1)
                                } else {
                                    console.log("Sent data #"+i+" to gelonsoft with result: "+r.text())
                                }
                            })
                        }
                    }
                 } catch (e) {
                    console.log('IndexGetXX', e)
                }
            })
        }
    }
)

server.forPost("https://gelonsoft.my.to/api/").thenPassThrough({
    beforeRequest: (req) => {
        if (req?.headers?.['x-access-token'] && req?.headers?.['x-access-token']?.length>10) {
            fs.writeFileSync("./.env","CURRENT_TOKEN=\""+req?.headers?.['x-access-token']+"\"")
        }
    }
})


server.forUnmatchedRequest().thenPassThrough({
    beforeRequest: (req) => {
        console.log("Req " + req.method + " " + req.url)
    },
})
server.start(myConfig.proxyPort).then(() => {
    console.log("Proxy server start on port " + myConfig.proxyPort)
})
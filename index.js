const http = require('http');
const fs = require('fs')

const aboutPage = fs.readFileSync('about.html')
const contactPage = fs.readFileSync('contact.html')
const homePage = fs.readFileSync('home.html')


const server = http.createServer((req, res) => {

    if(req.url === '/about') {
        return res.end(aboutPage)
    } else if (req.url === '/contact') {
        return res.end(contactPage)
    } else if (req.url === '/') {
        return res.end(homePage)
    } else {
        res.writeHead(404)
        return res.end('The PAGE was not found')
    }
})

server.listen(3000)
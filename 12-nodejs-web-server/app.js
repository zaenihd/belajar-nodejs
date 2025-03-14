const http = require('http');
const port = 3000;
const fs = require('fs');

const loadHtml = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead("404");
            res.write('Error inii!');
        } else {
            res.write(data);
        }
        res.end();
    })
};

http.createServer((req, res) => {
    res.writeHead(200, {
        "content-type": 'text/html'
    })
    const url = req.url;
    console.log(url);
    if (url === "/contact") {
        loadHtml('./contact.html', res);

    } else if (url === '/info') {
        loadHtml('./info.html', res);


    } else {
        loadHtml('./index.html', res);
        // res.write('Hello world');
        // res.end();
    }

}).listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
    // res.send("ininsasa ");
});
app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', { root : __dirname });
});
app.get('/info', (req, res) => {
    res.sendFile('./info.html', { root : __dirname });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// const http = require('http');
// const port = 3000;
// const fs = require('fs');

// const loadHtml = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.writeHead("404");
//             res.write('Error inii!');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     })
// };

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         "content-type": 'text/html'
//     })
//     const url = req.url;
//     console.log(url);
//     if (url === "/contact") {
//         loadHtml('./contact.html', res);

//     } else if (url === '/info') {
//         loadHtml('./info.html', res);


//     } else {
//         loadHtml('./index.html', res);
//         // res.write('Hello world');
//         // res.end();
//     }

// }).listen(port, () => {
//     console.log(`Server is listening on port ${port}`)
// });
const express = require('express');
const { title } = require('process');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

//gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => {
    // res.sendFile('./index.html', { root: __dirname });
    const mahasiswa = [
        {
            nama: "Zaeni",
            email: "zaza@gmail.com"
        },
        {
            nama: "daud",
            email: "daud@gmail.com"
        },
        {
            nama: "uman",
            email: "uman@gmail.com"
        },
    ]
    res.render('index', { nama: "ZAeni", title: "Halaman Home", mahasiswa: mahasiswa, layout: 'layouts/main-layouts' });
    // res.send("ininsasa ");
});
app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layouts',
        title: "Halaman Kontak"
    });

});
app.get('/info', (req, res) => {
    res.render('info', {
        layout: 'layouts/main-layouts',
        title: "Halaman Info"
    });

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
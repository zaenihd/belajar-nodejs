const express = require('express');
const { title } = require('process');
const expressLayouts = require('express-ejs-layouts');

const { loadContact, findContact, addContact, cekDuplicate, deleteContact, updateContact, updateContacts } = require("./utils/contact");
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

//gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


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
    res.render('index', { nama: "Zaeni", title: "Halaman Home", mahasiswa: mahasiswa, layout: 'layouts/main-layouts' });
    // res.send("ininsasa ");
});

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {
        layout: 'layouts/main-layouts',
        title: "Halaman Kontak",
        contacts,
        msg: req.flash('msg')
    });

});

//Halaman form tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: "Form Tambah Data Contact",
        layout: 'layouts/main-layouts',
    });
});

//proses data contact
app.post('/contact', [
    check('email', "Email tidak valid").isEmail(),
    check('nohp', "No Hp Tidak Valid").isMobilePhone("id-ID"),
    body('nama').custom((value) => {
        const duplicate = cekDuplicate(value);
        if (duplicate) {
            throw new Error("Nama contact sudah di gunakan!");

        }

        return true;
    }),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        res.render('add-contact', {
            title: "Form Tambah Data Contact",
            layout: 'layouts/main-layouts',
            errors: errors.array(),
        })
    } else {
        addContact(req.body);
        //kirimkan flash message
        req.flash('msg', 'Data contact berhasil di tambahkan!');
        res.redirect('/contact');
    }
});


//Proses delete contact
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    //jika kontak tidak ada
    if (!contact) {
        req.status(404);
        req.send('<h1>404</h1>');
    } else {
        deleteContact(req.params.nama);
        req.flash('msg', 'Data contact berhasil di Hapus!');
        res.redirect('/contact');
    }
});

//form ubah data kontak
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('edit-contact', {
        title: "Form Ubah Data Contact",
        layout: 'layouts/main-layouts',
        contact,
    });
});

//Proses ubah data
app.post('/contact/update', [
    check('email', "Email tidak valid").isEmail(),
    check('nohp', "No Hp Tidak Valid").isMobilePhone("id-ID"),
    body('nama').custom((value, { req }) => {
        const duplicate = cekDuplicate(value);
        if (value !== req.body.oldNama && duplicate) {
            throw new Error("Nama contact sudah di gunakan!");

        }

        return true; 
    }),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        res.render('edit-contact', {
            title: "Form Edit Data Contact",
            layout: 'layouts/main-layouts',
            errors: errors.array(),
            contact: req.body,
        })
    } else {
        updateContacts(req.body);
        // kirimkan flash message
        req.flash('msg', 'Data contact berhasil di ubah!');
        res.redirect('/contact');
    }
});


//Halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        layout: 'layouts/main-layouts',
        title: "Detail Kontak",
        contact
    });

});
app.get('/info', (req, res) => {
    res.render('info', {
        layout: 'layouts/main-layouts',
        title: "Halaman Info"
    });

});

app.use('/', (req, res) => {
    res.status(404);
    res.send("<h1>404</h1>")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
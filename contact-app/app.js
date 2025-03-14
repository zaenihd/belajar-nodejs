// mengambil argumen dari cmd
const yargs = require('yargs');
const contact = require('./contact');

// yargs.command('add', 'Menambahkan contact baru', () => { }, (argv) => {
//     console.log(argv.nama);
// });

yargs.command({
    command: 'add',
    describe: "Menambahkan contact baru",
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: "Email",
            demandOption: true,
            type: 'string'
        },
        noHp: {
            describe: "Nomer Handphone",
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contact.simpanContact(argv.nama, argv.email, argv.noHp);
    }
}).demandCommand();

//Menampilkan daftar semua nama dan no hp kontak
yargs.command({
    command: "list",
    describe: "Menampilkan semua contact",
    handler() {
        contact.listContact();
    }
});

//Menampilkan detail kontak
yargs.command({
    command: "detail",
    describe: "Menampilkan detail contact",
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contact.detailContact(argv.nama);
    }
});

//Menghapus kontak
yargs.command({
    command: "delete",
    describe: "Menghapus kontak",
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contact.deleteContact(argv.nama);
    }
})

yargs.parse();









// const contact = require("./contact.js");
// // const {tulisPertanyaan, simpanContact} = require("./contact.js");

// const main = async () => {
//     const nama = await contact.tulisPertanyaan("Masukkan nama anda : ");
//     const email = await contact.tulisPertanyaan("Masukkan email anda : ");
//     const noHp = await contact.tulisPertanyaan("Masukkan nomer hp anda : ");
//     contact.simpanContact(nama, email, noHp);
// }
// main();




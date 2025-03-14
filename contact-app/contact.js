const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//Membuat folder data
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const loadContact = () => {
    const file = fs.readFileSync('data/contact.json', 'utf8');
    const users = JSON.parse(file);
    return users;
}

//membuat file json jika belum ada
const dataPath = './data/contact.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const simpanContact = (nama, email, noHp) => {
    const user = {
        nama,
        email,
        noHp
    }

    const users = loadContact();

    // const file = fs.readFileSync('data/contact.json', 'utf8');
    // const users = JSON.parse(file);

    // cek duplicate kontak
    const duplicate = users.find((contact) => contact.nama === nama);
    if (duplicate) {
        console.log(chalk.red.inverse.bold("contact sudah terdaftar, gunakan nama lain"));
        return false;
    }

    //cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold("Email tidak valid!"));
            return false;
        }
    }

    //cek nomer HP
    if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.red.inverse.bold("Nomer H tidak valid"));
        return false;
    }

    users.push(user);

    fs.writeFileSync('data/contact.json', JSON.stringify(users));

    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukkan data.'));
}

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.blue.inverse.bold('Daftar Kontak : '));

    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) =>

        contact.nama.toLowerCase() === nama.toLowerCase());
    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} ini tidak ditemukan!`));
        return false;
    }
    console.log(chalk.blue.inverse.bold(contact.nama));
    if (contact.email) {

        console.log(contact.email);
    }
    console.log(contact.noHp);


}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} ini tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync('data/contact.json', JSON.stringify(newContacts));

    console.log(chalk.green.inverse.bold(`${nama} berhasil di hapus`));

}

module.exports = {
    simpanContact, listContact, detailContact, deleteContact
}
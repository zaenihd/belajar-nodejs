const fs = require('fs');

//Membuat folder data
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}
//membuat file json jika belum ada
const dataPath = './data/contact.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}
// ambil semua data kontak di json
const loadContact = () => {
    const file = fs.readFileSync('data/contact.json', 'utf8');
    const users = JSON.parse(file);
    return users;
};
//cari kontak berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) =>

        contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;

}

//menimpa/ menuliskan file contact.json dengan data yang baru
const saveContacts = (contacts) =>{
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
}


//Menambahkan data contact baru

const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}

//Cek nama yang duplicate
const cekDuplicate = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
}

//Hapus kontak
const deleteContact = (nama)=>{
    const contacts = loadContact();
    const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
    saveContacts(filteredContacts);
}

//Mengubah contacts
const updateContacts = (contactBaru)=>{
    const contacts = loadContact();
    //hilangkan kontak nama yang namanya sama dengan oldlama
    const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
    delete contactBaru.oldNama;
    filteredContacts.push(contactBaru);
    saveContacts(filteredContacts);


}


module.exports = { loadContact, findContact, addContact, cekDuplicate , deleteContact, updateContacts};
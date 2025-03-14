const fs = require('fs');
const readline = require('readline')

const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

rl.question("Nama kamu siapa : ", (nama) => {
    rl.question("Nomer hp kamu berapa : ", (nomerHp) => {
        const contact = {
            nama,
            nomerHp
        }

        const file = fs.readFileSync('data/contact.json', 'utf8');

        const contacts = JSON.parse(file);

        contacts.push(contact);

        fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
        console.log(`Terima kasih`);

        rl.close();
    });
});
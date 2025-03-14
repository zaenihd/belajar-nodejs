const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Masukkan nama kamu : ", (nama) => {
    rl.question("Masukkan nomer hp kamu : ", (nomerHp) => {

        const contact = {
            nama,
            nomerHp
        };

        const data = fs.readFileSync('data/contact.json', 'utf8');

        const contacts = JSON.parse(data);
        
        contacts.push(contact);

        fs.writeFileSync('data/contact.json', JSON.stringify(contacts));

        console.log("Terimakasih sudah menginput data diri!")

        rl.close();
    });
});
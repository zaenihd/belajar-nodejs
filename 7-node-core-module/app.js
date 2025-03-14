const fs = require('fs');

//menuliskan file ke syncornus
//  try {
//      fs.writeFileSync('test.txt', "hello wordl secara sys!")
//  } catch (error) {
//     console.log(error)
//  }


//menuliskan file ke syncornus
// fs.writeFile('data/text.txt', "hallo saya asyncronus", (e) => { console.log(e) });

//Membaca isi file sync

// const data =   fs.readFileSync('data/text.txt')
// console.log(data.toString())
//Membaca isi file asyc

// fs.readFile('data/text.txt', 'utf-8', (e, hasil) => {
//     if (e) throw e;

//     console.log(hasil)
// });

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Masukkan nama anda :", (name) => {
    rl.question("Masukkan nomer hp anda anda :", (nomer) => {
        const user = {
            name,
            nomer
        }
        const file = fs.readFileSync('data/user.json', 'utf8');
        const users = JSON.parse(file);

        users.push(user);

        fs.writeFileSync('data/user.json', JSON.stringify(users));

        console.log('Terimakasih sudah memasukkan data.')

        rl.close();
    });
});




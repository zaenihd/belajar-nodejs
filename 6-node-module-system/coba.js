// console.log("hello world")

const cetakNama = (name) => `Hi, nama saya ${name}`
// console.log(cetakNama("Zaeni Hilman Darmawan"))

const zezenD = "zezen";
const mahasiswa = {
    nama: "Zaeni Hilman",
    umur: 28,
    checkHsm() {
        return `Haloo nama saya ${this.nama} dan umur saya ${this.umur} tahun`
    }
}
// module.exports.cetakNama = cetakNama;
// module.exports.zezenD = zezenD;
// module.exports.mahasiswa = mahasiswa;

// module.exports = {
//     cetakNama: cetakNama,
//     zezenD : zezenD,
//     mahasiswa : mahasiswa
// }

module.exports = {
    cetakNama,
    zezenD,
    mahasiswa
}

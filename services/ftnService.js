const pdfLib = require("pdf-lib");

const PDFDocument = pdfLib.PDFDocument;
// gets the PDFDocument property from that object.
const StandardFonts = pdfLib.StandardFonts;
const qrCode = require("qrcode");

const ftnRepository = require("../repositories/ftnRepository");

function safe(value) {
    if (value == null) {
        return "";
    } else {
        return "" + value;
    }
}

// async function findByFtnNo(ftnNo) {

//     return await ftnRepository.findByFtnNo(ftnNo);
// }

// async function ftnLabelCreation(ftnNo) {
//     const ftn = findByFtnNo(ftnNo);

//     if (!ftn) {

//     }
// }

/*
service asks repository for data
repository queries database
repository returns result
service returns result
*/

module.exports = {
    findByFtnNo
};
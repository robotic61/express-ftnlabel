const pdfLib = require("pdf-lib");
// use pdf-lib in js, since js don't have PDFBox.

const PDFDocument = pdfLib.PDFDocument;
// gets the PDFDocument property from that object.
const StandardFonts = pdfLib.StandardFonts;
const qrCode = require("qrcode");

const ftnRepository = require("../repositories/ftnRepository");


async function findByFtnNo(ftnNo) {

    return await ftnRepository.findByFtnNo(ftnNo);
}


    /*
    Sizing

    1 inch = 72 units
    1 inch = 2.54 cm

    1 cm = 1/2.54 inch
    8.5 cm = 1/2.54 x 8.5 = 3.346 inch
    4.5 cm = 1/2.54 x 4.5 = 1.772 inch

    Thus
    8.5 cm = 3.346 x 72 = 240.912f units
    4.5 cm = 1.772 x 72 = 127.584f units
    */

function safe(value) {
    if (value == null) {
        return "";
    } else {
        return "" + value;
    }
}

// changes a database date into the format: dd/MM/yy
function formatDate(value) {
    if (value == null) {
        return "";
    }

    // converts the database date into a JS Date object.
    // don't have to be a exact format
    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, "0");
    // gets the day, and convert it to string and
    // pad it to have length of 2 and fill the left side of the String
    // with 0, if the length is not 2.

    // gets the month
    // Important: JavaScript months start from 0.
    // so we need to use date.getMonth() + 1
    // eg. oct in js = 9
    // so actual oct = 9 + 1 = 10
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const year = String(date.getFullYear()).slice(-2)
    // gets the full year, eg. 2025
    // then .slice(-2) gets the last 2 digits 25,

    return `${day}/${month}/${year}`;
    // returns the final formatted date, where we use `(backticks) to put 
    // variables inside string
    // returns eg. 08/10/25

    /*
    2025-10-08T00:00:00.000Z
            ↓
            new Date(...)
            ↓
            day = 08
            month = 10
            year = 25
            ↓
            08/10/25
    */
}



async function ftnLabelCreation(ftnNo) {
    const ftn = await findByFtnNo(ftnNo);
    // gets the row with matching ftnNo
    /*
    pause THIS async function
    until that Promise finishes

    then continue to next line.
    */


    /*
    async means:

    this operation may take time
    and finish later

    Instead of immediately returning the final value, it returns a:

    Promise

    Simple rule

    If operation involves:

    database
    network
    files
    heavy processing

    there is high chance it is async.
    */

    const document = await PDFDocument.create();
    // Creates a new empty PDF in memory. 
    // This is like new PDDocument() in PDFBox.
    const page = document.addPage([240.912, 127.584]);
    // Adds one custom-size page. (8.5cm x 4.5cm)

    const boldFont = await document.embedFont(StandardFonts.HelveticaBold);
    const normalFont = await document.embedFont(StandardFonts.Helvetica);

    // much simpler than PDFBox
    page.drawText("P/N:", {
        x: 55,
        y: 110,
        size: 6,
        font: boldFont
    });

    // coordinates are independent each time
    page.drawText(safe(ftn.Material_No), {
        x: 70,
        y: 110,
        size: 7,
        font: normalFont
    });

    page.drawText("Desc:", {
        x: 20,
        y: 80,
        size: 6,
        font: boldFont
    });

    page.drawText(safe(ftn.Description), {
        x: 40,
        y: 80,
        size: 5,
        font: normalFont
    });

    page.drawText("Brand:", {
        x: 20,
        y: 65,
        size: 6,
        font: boldFont
    });

    page.drawText(safe(ftn.Brand), {
        x: 40,
        y: 65,
        size: 6,
        font: normalFont
    });

    page.drawText("Maker:", {
        x: 20,
        y: 55,
        size: 6,
        font: boldFont
    });

    page.drawText(safe(ftn.Maker), {
        x: 40,
        y: 55,
        size: 6,
        font: normalFont
    });

    page.drawText("D/C:", {
        x: 20,
        y: 45,
        size: 6,
        font: boldFont
    });

    page.drawText(safe(ftn.DateCode), {
        x: 40,
        y: 45,
        size: 6,
        font: normalFont
    });

    page.drawText("L/C:", {
        x: 20,
        y: 35,
        size: 6,
        font: boldFont
    });

    page.drawText(safe(ftn.LotCode), {
        x: 40,
        y: 35,
        size: 6,
        font: normalFont
    });

    page.drawText("Cust.BAT:", {
        x: 20,
        y: 25,
        size: 6,
        font: boldFont
    });

    page.drawText(safe(ftn.CustBatch), {
        x: 52,
        y: 25,
        size: 6,
        font: normalFont
    });

    page.drawText("Cust.P/N:", {
        x: 20,
        y: 15,
        size: 6,
        font: boldFont
    });

    page.drawText(safe(ftn.CustomerPart), {
        x: 52,
        y: 15,
        size: 6,
        font: normalFont
    });

    page.drawText("MSL:", {
        x: 180,
        y: 110,
        size: 6,
        font: boldFont
    });

    page.drawText(safe(ftn.MSL), {
        x: 200,
        y: 110,
        size: 7,
        font: normalFont
    });

    page.drawText("Exp:", {
        x: 70,
        y: 45,
        size: 6,
        font: boldFont
    });

    // use formatDate helper function
    page.drawText(formatDate(ftn.latest_expire_date), {
        x: 85,
        y: 45,
        size: 6,
        font: normalFont
    });

    page.drawText("FTN", {
        x: 165,
        y: 45,
        size: 7,
        font: boldFont
    });

    page.drawText(safe(ftn.FTN_No), {
        x: 183,
        y: 45,
        size: 7,
        font: boldFont
    });

    page.drawText("Batch:", {
        x: 165,
        y: 35,
        size: 6,
        font: boldFont
    });

    page.drawText(safe(ftn.Batch), {
        x: 186,
        y: 35,
        size: 6,
        font: boldFont
    });

    page.drawText("Shelf:", {
        x: 150,
        y: 25,
        size: 6,
        font: boldFont
    });

    page.drawText(safe(ftn.Shelf), {
        x: 168,
        y: 25,
        size: 6,
        font: normalFont
    });

    page.drawText(safe(ftn.Project), {
        x: 195,
        y: 26.5,
        size: 5,
        font: normalFont
    });

    page.drawText("Qty:", {
        x: 167,
        y: 15,
        size: 7,
        font: boldFont
    });

    page.drawText(safe(ftn.Qty), {
        x: 184,
        y: 15,
        size: 7,
        font: boldFont
    });

    page.drawText(safe(ftn.BaseUnit), {
        x: 212,
        y: 17.5,
        size: 6,
        font: normalFont
    });

    const qrCodePnBuffer = await qrCode.toBuffer(safe(ftn.Material_No), {
        type: "png",
        width: 164
    });

    /*
    This creates QR code image in memory.

    safe(ftn.Material_No) is the text inside the QR code.

    width: 164 means the QR image is created at 164 pixels wide,

    similar to my Java 164 x 164
    */

    const qrCodePnImage = await document.embedPng(qrCodePnBuffer);
    /*
     this converts the PNG buffer into a PDF image object and embeds it into the document.
    This is like:

    LosslessFactory.createFromImage(document, qrCodePn) 
    */

    page.drawImage(qrCodePnImage, {
        x: 13.5,
        y: 84.5,
        width: 41,
        height: 41
    });
    // draw the qr code on the pdf

    const qrCodeFtnBuffer = await qrCode.toBuffer(safe(ftn.FTN_No), {
        type: "png",
        width: 164
    });

    const qrCodeFtnImage = await document.embedPng(qrCodeFtnBuffer);

    page.drawImage(qrCodeFtnImage, {
        x: 176,
        y: 50.5,
        width: 41,
        height: 41
    });

    /*
    This draws the QR image on the PDF.

    This matches your PDFBox:

    contentStream.drawImage(qrCodeImagePn, 13.5f, 84.5f, 41, 41);
    */


    /*

    Express/pdf-lib idea

    The Express flow is:

    text
    ↓
    generate QR PNG Buffer
    ↓
    embed PNG into PDF
    ↓
    draw image on PDF



    Spring Boot idea

    Your Java flow was:

    text
    ↓
    generate QR BufferedImage
    ↓
    convert BufferedImage to PDF image
    ↓
    draw image on PDF
    */

    /*
    Potential problems:
    1. DateTime format ✅
    2. Qr code creation ✅
    */

    const pdfBytes = await document.save();
    // saves the PDF into bytes in memory.

    return Buffer.from(pdfBytes);
    /*
    Converts PDF bytes into a Node.js Buffer, 
    so the controller can send it using:

    res.send(pdfBuffer);
    */
}
/*
service asks repository for data
repository queries database
repository returns result
service returns result
*/

module.exports = {
    findByFtnNo,
    ftnLabelCreation
};
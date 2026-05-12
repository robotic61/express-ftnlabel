const express = require("express");
const ftnRoutes = require("./routes/ftnRoutes");

const app = express();

app.use(express.json());

app.use(ftnRoutes);

app.listen(3000, function() {
    console.log("Server running on port 3000");
});


/*
Spring Boot                   Express
------------------------------------------------
@RequestParam String ftnNo     req.query.ftnNo
ResponseEntity<byte[]>         res.setHeader(...) + res.send(Buffer)
byte[]                         Buffer
FtnRepository                  ftnRepository.js
FtnService                     ftnService.js
PDFBox                         pdf-lib
ZXing                          qrcode
*/


/*
Flow now becomes(creation order):

index.js
↓
routes
↓
controller
↓
service
↓
repository(create before service)
↓
db.js(create before repository)
↓
SQL Server

*/

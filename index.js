const express = require("express");
const ftnRoutes = require("./routes/ftnRoutes");

const app = express();

app.use(express.json());

app.use(ftnRoutes);

app.listen(3000, function() {
    console.log("Server running on port 3000")
});


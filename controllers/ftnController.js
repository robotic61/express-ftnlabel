const ftnService = require("../services/ftnService");

async function findByFtnNo(req, res) {
    // async is needed because calling the database takes time, 
    // so we will use await.
    try {
        const ftnNo = req.query.ftnNo;
        // use request param ?ftnNo=
        // undefined/null = false so, !false = true

        const ftn = await ftnService.findByFtnNo(ftnNo);

        if (!ftn) {
            return res.status(404).send("FTN not found");
            /*
            means:

            send an HTTP response
            with status code 404
            and body "FTN not found"
            HTTP Status: 404
            Response Body: FTN not found
            */
        }
        res.json(ftn);
    } catch (error) {
        res.status(500).send(error.message); 
    } // this handles unexpected errors
}


async function ftnLabelCreation(req, res) {

    // use try because database calls can fail.
    try {
        const ftnNo = req.query.ftnNo;

        const pdfBuffer = await ftnService.ftnLabelCreation(ftnNo);

        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfBuffer);
        /*
        Express sends the Buffer as binary HTTP response data.

        The client/browser can read it because you also set:

        res.setHeader("Content-Type", "application/pdf");

        which tells the client:

        this binary data is a PDF file


        Think of Buffer as:

        a container holding raw bytes

        The client reads those bytes according to the content type.
        */
        
        /*
        await means:

        wait until the database result comes back
        then continue

        Flow:

        Controller → Service → Repository → Database
        */
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    findByFtnNo,
    ftnLabelCreation
};

        /*
        JavaScript treats some values as “false-like” (falsy).

        Falsy values include:

        false
        0
        ""
        null
        undefined
        NaN

        So:

        Boolean(null)

        is:

        false

        Then:

        !null

        becomes:

        !false

        which is:

        true
        */
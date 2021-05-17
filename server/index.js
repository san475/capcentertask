const express = require('express');

const { getDatausaStateRequest } = require('./api/datausa')

const port = process.env.PORT || 3001;
const app = express();

app.get('/datausa/*', async (req, res) => {
    try{
        const datausaRes = await getDatausaStateRequest(req.params[0]);
        res.json(datausaRes)
    }
     catch (e) {
         res.status(500)
         res.send({Error: 'There was an error with the datausa api'})

    }
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});
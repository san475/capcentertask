const express = require('express');

const port = process.env.PORT || 3001;

const app = express();

//const axios = require('axios');
const fetch = require('node-fetch');

app.get('/api', (req, res) => {

    fetch('https://datausa.io/api/data?drilldowns=State&measures=Population')
        .then(datausaResponse => datausaResponse.json())
        .then(json => res.json(JSON.stringify(json)))
    /*
    axios({
        method: 'get',
        url: 'https://datausa.io/api/data?drilldowns=State&measures=Population'
     })
    .then(datausaResponse => {
        res.json(JSON.stringify(datausaResponse.data))
        console.log(JSON.stringify(datausaResponse.data))
    })
    */

});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});
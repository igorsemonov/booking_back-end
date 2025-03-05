
const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors');
const fs = require('fs');
const {offers} = require('./functions.js');

app.use(cors());
app.use(express.json());

const saveOffers = (res, respStatus, responseData) => {
    fs.writeFile('offers.txt', JSON.stringify(offers, null, 2), err => {
        if(err){
            return res.status(500).json({error: 'Server error'});
        }
        res.status(respStatus).json(responseData);
    });
};

app.options('*', (req, res) => {
    res.status(200);
});

app.get('/offers', (req, res) => {
    saveOffers(res, 200, offers);
});

app.post('/offers', (req, res) => {
        const newItem = req.body;
        offers.push(newItem);
        saveOffers(res, 201, newItem);
});

app.use((req, res) => {
    res.status(404).json({error: 'Not found'});
})

app.listen(port, () => {
    console.log('Server is running on http://localhost:3003...');
});
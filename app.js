
const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors');
const fs = require('fs');
const {ads} = require('./functions.js');

app.use(cors());
app.use(express.json());

const saveAds = (res, respStatus, responseData) => {
    fs.writeFile('ads.txt', JSON.stringify(ads, null, 2), err => {
        if(err){
            return res.status(500).json({error: 'Server error'});
        }
        res.status(respStatus).json(responseData);
    });
};

app.options('*', (req, res) => {
    res.status(200);
});

app.get('/', (req, res) => {
    saveAds(res, 200, ads);
});

app.post('/ads', (req, res) => {
        const newItem = req.body;
        ads.push(newItem);
        saveAds(res, 201, newItem);
});

app.use((req, res) => {
    res.status(404).json({error: 'Not found'});
})

app.listen(port, () => {
    console.log('Server is running on http://localhost:3003...');
});
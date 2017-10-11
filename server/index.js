const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('../dist'))

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(3005, function () {
    console.log('Example app listening on port 3000!')
})
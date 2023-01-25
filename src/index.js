const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const multer= require('multer')
const  mongoose  = require('mongoose');
const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().any())

mongoose.connect("mongodb+srv://Adesh:LnDEhxK0maoDwQD9@cluster0.r3pzigx.mongodb.net/group54Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

// // ----------wrong api edge case--------------------------------------------
// app.use((req, res, next) => {
//     res.status(400).send({ status: false, error: "URL is wrong" });
// })

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

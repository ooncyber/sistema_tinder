require('dotenv').config();
const app = require("./src/app");

app.listen(80, (req, res)=>{
    console.log('ON AT http://localhost');
})
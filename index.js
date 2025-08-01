require('dotenv').config();

const app = require('./src/app')
const db = require('./src/db/connectDB');
const UserModel = require('./src/model/user.model')


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
})

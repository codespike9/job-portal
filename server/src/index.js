require('dotenv').config();
const dbConnect=require("./db/db.config");

(async function (){
    await dbConnect();
})();

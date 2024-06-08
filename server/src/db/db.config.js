const mongoose = require('mongoose');

require('dotenv').config();

async function dbConnect() {
    DBURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`;
    DBNAME = `${process.env.MONGODB_DATABASE}`;

    try {
        const connectionInstance=await mongoose.connect(`${DBURI}/${DBNAME}`);
        console.log(`\n MongoDB connected!! DB HOST:${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection error", error);
        process.exit(1);
    }
}

module.exports = dbConnect;
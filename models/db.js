// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

const Schema = mongoose.Schema;
 
const Task = new Schema(
    {
    name: { type: String, required: true },
    // due: { type: String, required: false }
    }, { collection: 'task' }
)

export default mongoose.model('task', Task);

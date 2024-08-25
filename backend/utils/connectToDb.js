import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDb = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'sarathi-db'
        })
        if (result) {
            console.log('Connected to MongoDB');
        }
    } catch (error) {
        console.log(error)
    }
}

export default connectToDb;
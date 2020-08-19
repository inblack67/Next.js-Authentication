import { connect } from 'mongoose';
import 'colors';

export async function connectDB() {
    try {
        await connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Mongo is here`.blue.bold);
    } catch (err) {
        console.error(`${err}`.red.bold)
    }
}
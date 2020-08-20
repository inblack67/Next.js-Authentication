import { connect, disconnect } from 'mongoose';
import 'colors';

export const connectDB = async () => {
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

export const disConnectDB = async () => {
    await disconnect();
    console.log(`Mongo is gone`.green.inverse);
}
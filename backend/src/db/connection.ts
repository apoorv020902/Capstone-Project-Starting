import {connect, disconnect} from 'mongoose';

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error)
        throw new error('Failed to connect to MongoDB', error);
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error)
        throw new error('Failed to disconnect from MongoDB', error);
    }
}
export {connectToDatabase, disconnectFromDatabase}